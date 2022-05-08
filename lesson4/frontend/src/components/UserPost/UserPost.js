import React from 'react';
import css from './UserPost.module.css';

const UserPost = ({ post }) => {
    const {
        title,
        text,
    } = post;
    return (
        <div className={css.user_post_box}>
            <div>Title: {title}</div>
            <div>{text}</div>
        </div>
    );
};

export { UserPost };
