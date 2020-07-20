const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    axios = require('axios');

app.use(bodyparser.json());    

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body;
    // console.log(`Retrieved TYPE: ${event.type} and DATA: ${JSON.stringify(event.data)}`);
    events.push(event);
    try {
        await Promise.all([
            axios.post('http://localhost:4000/events', event),
            axios.post('http://localhost:4001/events', event),
            axios.post('http://localhost:4002/events', event),
            axios.post('http://localhost:4003/events', event)
        ]);
    } catch {}
    res.status(200).send({status: 'ok'});
});

app.get('/events', (req, res) => {
    res.status(200).send(events);
});

app.listen(4005, () => {
    console.log(`Listening on port 4005`);
});