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

//GET route to get a developer array
app.get('/api/developers/', (req, res) => {
    res.json(db);
});

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
        .json({
            message: 'Hurray! A new developer successfully added!',
            developer: newDeveloper
        });
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

// PATCH route to update an existing developer
// In Express one can provide an array of middleware functions as the second argument to a route.
app.patch('/api/developers/:id', [
    (req, res, next) => {
        const { body, validationResult } = require('express-validator');
        // Define validation rules
        body('name').optional().isString().withMessage('Name must be a string');
        body('email').optional().isString().withMessage('Email must be a valid email address');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Request can proceed to the actual route handler.
    }
], (req, res) => {
    const devId = Number(req.params.id);
    const devIndex = db.findIndex(dev => dev.id === devId); // Find the index of the developer by their ID

    if (devIndex === -1) {
        res.status(404).json({ message: "I'm sorry! Developer not found :(" }); // 404: Not found if the developer is not found
        return;
    }

    // Update the developer's object with tthe request body data
    const updateData = req.body;

    if (updateData.name !== undefined) {
        db[devIndex].name = updateData.name;
    }

    if (updateData.email !== undefined) {
        db[devIndex].email = updateData.email;
    }

    res.json(db[devIndex]);
});

module.exports = app;