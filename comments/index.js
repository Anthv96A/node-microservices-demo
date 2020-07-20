const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    { uuid } = require('uuidv4')
    cors = require('cors'),
    axios = require('axios');

const postComments = {};

app.use(bodyparser.json());    
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comments = (postId in postComments) ? postComments[postId] : [];
    res.status(200).send(comments)
});

app.post('/posts/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const id = uuid();
    const comment = { id, ...req.body, postId, status: 'pending' };

    postId in postComments ? postComments[postId].push(comment) : postComments[postId] = [comment];
    
    await axios.post(`http://localhost:4005/events`, { type: 'CommentCreated', data: comment });

    res.status(201).send(postComments);
});

app.post('/events', async (req, res) => {
    const event = req.body;
    await onHandleEventAsync(event);
    res.send({ status: 'OK' });
});

app.listen(4001, () => {
    console.log(`Listening on port 4001`);
});

async function onHandleEventAsync({ type, data }) {
    switch (type){
        case 'CommentModerated':
            const key = Object.keys(postComments).find(k => k === data.postId);
            if(!key)
                throw new Error('Comment not found');   

            const comment = postComments[key].find(c => c.id === data.id);

            await axios.post(`http://localhost:4005/events`, { type: 'CommentUpdated', data: { ...comment, status: data.status } });
        break;
    }
}