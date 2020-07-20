const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    axios = require('axios');

app.use(bodyparser.json());    

app.post('/events', async (req, res) => {
    const event = req.body;
    await handleDataAsync(event);
    res.status(200).send({ status: 'ok' });
});

app.listen(4003, () => {
    console.log(`Listening on port 4003`);
});

async function handleDataAsync({ type, data }) {
    try {
        switch(type) {
            case 'CommentCreated':
                const status = data.content.includes('oranges') ? 'rejected' : 'approved';
                await axios.post(`http://localhost:4005/events`, { type: 'CommentModerated', data: { ...data, status } });
        }
    } catch {}
}