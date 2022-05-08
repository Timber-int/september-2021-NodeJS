import React from 'react';
import css from './UserComment.module.css';

const UserComment = ({ comment }) => {

    const {
        text,
        like,
        dislike,
    } = comment;
    return (
        <div>
            <div className={css.action_type}>
                <span className={like > 0 ? css.action_like : css.action_type}>👍  {like}  </span>
                <span className={like > 0 ? css.action_dislike : css.action_type}>👎  {dislike}  </span>
                <div>
                    {text}
                </div>
            </div>
        </div>
    );
};

export { UserComment };
