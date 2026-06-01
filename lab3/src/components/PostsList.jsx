import React from 'react';
import PostCard from './PostCard';

const PostsList = ({ posts, getUserName }) => {
    if (posts.length === 0) {
        return <div className="no-results">Посты не найдены</div>;
    }

    return (
        <div className="posts-grid">
            {posts.map(post => (
                <PostCard
                    key={post.id}
                    title={post.title}
                    body={post.body}
                    authorName={getUserName(post.userId)}
                />
            ))}
        </div>
    );
};

export default PostsList;