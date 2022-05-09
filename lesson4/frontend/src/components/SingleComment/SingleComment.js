import React from 'react';
import css from './SingleComment.module.css';
import { useDispatch } from 'react-redux';
import { createActionComment } from '../../redux';

const SingleComment = ({
    comment,
    index
}) => {

    const dispatch = useDispatch();

    const {
        id,
        text,
        like,
        dislike,
    } = comment;

    return (
        <div className={css.single_comment_box}>
            <div className={css.action_type}>
                <span onClick={() => dispatch(createActionComment({
                    action: 'like',
                    commentId: id
                }))} className={like > 0 ? css.action_like : css.action_type}>👍 {like}  </span>

                <span onClick={() => dispatch(createActionComment({
                    action: 'dislike',
                    commentId: id
                }))}
                      className={like > 0 ? css.action_dislike : css.action_type}>👎 {dislike}  </span>
                <div>
                    {index + 1}) {text}
                </div>
            </div>
        </div>
    );
};

export { SingleComment };
