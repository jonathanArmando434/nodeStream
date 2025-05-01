import { createServer }  from 'node:http';

const app = createServer((req, res) => {
    res.writeHead(206, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
    })

    res.end(JSON.stringify({
        message: "Hello World"
    }))
})

app.listen(3000, () => {
    console.log('Server is running...')
})