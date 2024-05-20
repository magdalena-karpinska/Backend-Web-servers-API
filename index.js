const express = require('express');
const app = express();

const db = [
    {
        id: 1,
        name: 'Magdalena Karpinska',
        email: 'magdalena.karpinska13@gmail.com'
    },
    {
        id: 2,
        name: 'Ignacio Monge',
        email: 'ignaciomonge@gmail.com'
    },
    {
        id: 3,
        name: 'Uttejh Reddy',
        email: 'uttejhreddy@gmail.com'
    }
];

// Middleware to parse JSON bodies
app.use(express.json());

// GET route to get a developer by ID
app.get('/api/developers/:id', (req, res) => {
    const dev = db.find(dev => dev.id == req.params.id); //'==' allows for a comparison between a string (route params) and a number (id)
    if(!dev) {
        res.status(404).end();
        return;
    }
    res.json(dev);
});

// POST route to add a new developer
app.post('/api/developers/', (req, res) => {
    const newDeveloper = {
        id: db.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    db.push(newDeveloper);

    res
        .status(201)
        .setHeader('location', `/api/developers/${newDeveloper.id}`)
        .json(newDeveloper);
});

// DELETE route to remove a developer by ID
app.delete('/api/developers/:id', (req, res) => {
    const devId = Number(req.params.id); // Convert the id param to a number
    const devIndex = db.findIndex(dev => dev.id === devId); // Find the index of the developer by their ID

    if (devIndex === -1) {
        res.status(404).end(); // Return 404 if the developer is not found
        return;
    }

    db.splice(devIndex, 1); // Remove the developer from the array
    res.status(204).end(); // 204 - no content
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});