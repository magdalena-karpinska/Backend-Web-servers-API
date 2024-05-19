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

// Function to get the file name from URL
const fileNameOfUrl = (url) => {
    let fileName = url.split('/')[1] || 'index.html';
    return fileName;

};
// Function to get file content or serve a 404 page
const getFileContentOr404 = (fileName) => {
    const filePath = `./static/${fileName}`;
    if(!fs.existsSync(filePath)) {
        fileName = '404.html';
    }
    return fs.readFileSync(filePath, 'utf-8');
};

// Server setup
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(`The URL for the request was ${req.url}`);
    console.log(`The Method for the request was ${req.method}`);
   
    const fileName = fileNameOfUrl(req.url);

    // Check for favicon.ico request and handle it separately
    if(fileName === 'favicon.ico') {
        res.statusCode = 404;
        res.end('');
        return;
    }

    // Get file content or serve a 404 page if the file doesn't exist
    const content = getFileContentOr404(fileName);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(content);
});

// Server configuration
const hostname = 'localhost';
const port = 3000;

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});