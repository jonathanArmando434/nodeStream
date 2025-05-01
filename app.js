import { createServer }  from 'node:http'
import { join } from 'node:path'
import fs from 'node:fs'

const app = createServer(async (req, res) => {
    const dirname = import.meta.dirname;
    const videoPath = join(dirname, 'cap.america.mp4')
    const {size} = await fs.promises.stat(videoPath)
    const {range} = req.headers

    if(!range) {
        res.writeHead(200, {
            'content-length': size,
            'Content-Type': 'video/mp4'
        })

        return fs.createReadStream(videoPath).pipe(res)
    }

    const chunkSize = 1024 * 1024 // 1MB
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-')
    const start = parseInt(startStr, 10)
    const end = endStr ? parseInt(endStr, 10) : Math.min(start + chunkSize - 1, size - 1)

    res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4'
    })

    const stream = fs.createReadStream(videoPath, {start, end})
    return stream.pipe(res)
})

app.listen(3000, () => {
    console.log('Server is running...')
})