// Import Express
const express = require('express');
const morgan = require('morgan');

// Create an app
const app = express();

app.use(morgan('tiny'));
// Serve static files
app.use(express.static('static'));

//Define a route
app.get('/', (req, res) => {
    res.send('Hello fellow developer');
});

//Set the port
const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});