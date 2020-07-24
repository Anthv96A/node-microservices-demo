import React from 'react';

const CommentList = ({ comments }) => {
  const renderedComments = comments.map(c => {
    const { style, text } = renderedContent(c);
    return <li style={style} key={c.id}>{ text }</li>;
  });
  return <ul>{renderedComments}</ul>;
};


function renderedContent(comment) {
  if(comment.status === 'pending')
    return { style: { color: 'blue' }, text: 'Awaiting approval' };
    
  if(comment.status === 'rejected')
    return { style: { color: 'red' }, text: 'Rejected' };

  return { style: { color: 'green' }, text: comment.content };
}

export default CommentList;