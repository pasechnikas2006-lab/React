import React from 'react';

const PostCard = ({ title, body, authorName }) => {
    return (
        <div className="post-card">
            <div className="post-header">
                <span className="post-author">{authorName}</span>
            </div>
            <div className="post-body">
                <h3 className="post-title">{title}</h3>
                <p className="post-text">{body}</p>
            </div>
        </div>
    );
};

export default PostCard;