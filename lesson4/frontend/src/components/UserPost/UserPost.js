import React from 'react';

const UserPost = ({ post }) => {
    const {
        title,
        text,
    } = post;
    return (
        <div>
            <div>Title: {title}</div>
            <div>{text}</div>
        </div>
    );
};

export { UserPost };
