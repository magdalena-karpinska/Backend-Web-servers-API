const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello fellow developer!');
});

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http;//${hostname}:${port}/`)
});