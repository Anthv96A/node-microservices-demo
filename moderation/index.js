const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    axios = require('axios');

const eventBusAddress = process.env.EVENT_BUS_SERVICE_SERVICE_HOST || 'localhost';
const port = process.env.PORT || 4003;
    

app.use(bodyparser.json());    

app.post('/events', async (req, res) => {
    const event = req.body;
    await handleDataAsync(event);
    res.status(200).send({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

async function handleDataAsync({ type, data }) {
    try {
        switch(type) {
            case 'CommentCreated':
                const status = data.content.includes('oranges') ? 'rejected' : 'approved';
                await axios.post(`http://${eventBusAddress}:4005/events`, { type: 'CommentModerated', data: { ...data, status } });
        }
    } catch {}
}