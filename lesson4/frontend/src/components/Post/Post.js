import React from 'react';
import css from './Post.module.css';
import { FormCommentCreate } from '../FormCommentCreate/FormCommentCreate';
import { Comment } from '../Comment/Comment';

const Post = ({
    post,
    index,
    user
}) => {

    const {
        title,
        text,
        comments,
        createdAt,
    } = post;

    return (
        <>
            <div className={css.post_box}>
                <div className={css.post_create_time}>CreatedAt: {createdAt}</div>
                <div className={css.post_box_title}>{index + 1}) {title}</div>
                <div className={css.post_box_text}>{text}</div>
                <div>Comments: {
                    comments && comments.length > 0
                        ?
                        comments.map((comment, index) => <Comment key={comment.id} comment={comment} index={index}/>)
                        :
                        <></>
                }
                </div>
            </div>
            <div className={css.comment_create_form}>
                <FormCommentCreate user={user} post={post}/>
            </div>
        </>
    );
};

export { Post };
