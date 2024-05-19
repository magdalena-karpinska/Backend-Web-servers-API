const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // res.send('Hello');
    const dev = {
        id: 1,
        name: 'Marcus Dev',
        email: 'marcus@salt.dev'
    }
    res
    .status(201)
    .setHeader('location', `/api/developers/1`)
    .json(dev);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});