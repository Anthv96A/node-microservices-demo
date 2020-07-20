const express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    cors = require('cors'),
    axios = require('axios');

const postComments = {}; 

app.use(bodyparser.json());    
app.use(cors());

app.get('/posts', (req, res) => {
    res.status(200).send(postComments)
});

app.post('/events', (req, res) => {
    const event = req.body;
    onHandleEvent(event);
    res.send({ status: 'OK' });
});

app.listen(4002, async () => {

    try {
        console.log(`Listening on port 4002`);
        const events = (await axios.get('http://localhost:4005/events')).data;
        events.forEach(event => onHandleEvent(event));
    } catch {}
});


function onHandleEvent(event) {
    switch(event.type) {
        case 'PostCreated':
            onHandlePost(postComments, event.data);
        break;
        case 'CommentUpdated':
        case 'CommentCreated':
            onHandleComment(postComments, event.data);
        break;
        default:
            console.log(`Unknown event type ${event.type}`);
    }
}

function onHandlePost(postComments, data) {
    if(!(data.id in postComments))
        postComments[data.id] = { ...data, comments: [] };
}
function onHandleComment(postComments, data) {
    if(!(data.postId in postComments))
        throw new Error('Post not found');

    const comments = postComments[data.postId].comments;    

    if(comments.some(c => c.id === data.id) === false) {
        comments.push(data);
        return;
    }
    
    postComments[data.postId].comments = [...comments.map(c => (c.id !== data.id) ? c : { ...c, content: data.content, status: data.status }) ];
}