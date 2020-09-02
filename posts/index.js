const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    { uuid } = require('uuidv4'),
    cors = require('cors'),
    axios = require('axios');

const eventBusAddress = process.env.EVENT_BUS_IP_ADDRESS || 'localhost';
const port = process.env.PORT || 4000;

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
    try {
        await axios.post(`http://${eventBusAddress}:4005/events`, { type: 'PostCreated', data: post });
    } catch (error) {
        console.log(error);
    }
 
    res.status(201).send(post);
});

app.post('/events', (_, res) => {
    res.send({ status: 'OK' });
});

app.listen(port, () => { 
    console.log(`Listening on port ${port}`);
});