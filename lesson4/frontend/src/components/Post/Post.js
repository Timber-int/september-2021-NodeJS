import React from 'react';
import css from './Post.module.css';

const Post = ({
    post,
    index,
}) => {

    const {
        title,
        text,
    } = post;

    return (
        <div className={css.post_box}>
            <div className={css.post_box_title}>{index + 1}) {title}</div>
            <div className={css.post_box_text}>{text}</div>
        </div>
    );
};

export { Post };
