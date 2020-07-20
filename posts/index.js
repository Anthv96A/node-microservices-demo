const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    { uuid } = require('uuidv4'),
    cors = require('cors'),
    axios = require('axios');

const posts = {}; 

app.use(bodyparser.json());    
app.use(cors());

app.get('/posts', (req, res, next) => {
    res.status(200).send(posts)
});

app.post('/posts', async (req, res, next) => {
    const id = uuid();
    posts[id] = { id, ...req.body};

    const post = posts[id];

    await axios.post('http://localhost:4005/events', { type: 'PostCreated', data: post });

    res.status(201).send(post);
});

app.post('/events', (req, res) => {
    res.send({ status: 'OK' });
});

app.listen(4000, () => {
    console.log(`Listening on port 4000`);
});