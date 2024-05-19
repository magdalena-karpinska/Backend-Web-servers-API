// // Step 1: Import the build-in 'http' module on Node.js, which allows to create an HTTP server.
// const http = require('http');

// // Step 2: Create the server
// const server = http.createServer((req, res) => {
//     res.statusCode = 200; // Sets status code to 200 (OK)
//     // res.setHeader('Content-Type', 'text/plain'); // Set content type to plain text
//     // res.end('Hello fellow developer!'); // Send response and end the connection
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<h1>Hello fellow developer!</h1>');
// });

// // Step 3: Define the hostname and port
// const hostname = 'localhost'; // Hostname set to 'localhost'
// const port = 3000; // Port set to 3000

// // Step 4: Start the server
// server.listen(port, hostname, () => {
//     console.log(`Server running at http;//${hostname}:${port}/`)
// });

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const content = fs.readFileSync('./static/index.html', 'utf-8');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(content);

const hostname = 'localhost';
const port = 3000;

server.listen(port, hostname, () => {
    console.log(`Server running at http;//${hostname}:${port}/`)
});


});