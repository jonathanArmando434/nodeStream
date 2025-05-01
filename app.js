import { createServer }  from 'node:http';
import { join } from 'node:path';

const app = createServer((req, res) => {
    const dirname = import.meta.dirname;
    const videoPath = join(dirname, 'cap.america.mp4');

    console.log(videoPath);

    res.end(videoPath);
})

app.listen(3000, () => {
    console.log('Server is running...')
})