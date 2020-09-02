const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    axios = require('axios');

app.use(bodyparser.json());

const postsAddress = process.env.POSTS_IP_ADDRESS || 'localhost';
const commentsAddress = process.env.COMMENTS_SERVICE_SERVICE_HOST || 'localhost';
const queryAddress = process.env.QUERY_SERVICE_SERVICE_HOST || 'localhost';
const moderationAddress = process.env.MODERATION_SERVICE_SERVICE_HOST || 'localhost';

const port = process.env.PORT || 4005;
const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    console.log(`Retrieved TYPE: ${event.type}`);
    events.push(event);
    try {
        await Promise.all([
            axios.post(`http://${postsAddress}:4000/events`, event),
            axios.post(`http://${commentsAddress}:4001/events`, event),
            axios.post(`http://${queryAddress}:4002/events`, event),
            axios.post(`http://${moderationAddress}:4003/events`, event)
        ]);
    } catch(error) {
        console.log(error);
    }
    res.status(200).send({status: 'ok'});
});

app.get('/events', (req, res) => {
    res.status(200).send(events);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});