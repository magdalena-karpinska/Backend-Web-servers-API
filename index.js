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
        email: 'uttejhreddy.com'
    }
];

app.get('/api/developers', (req, res) => {
    // res.send('Hello');
    res.json(db);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});