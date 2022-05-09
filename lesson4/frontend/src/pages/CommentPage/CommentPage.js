import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from '../../redux';
import { SingleComment } from '../../components';
import css from './CommentPage.module.css';

const CommentPage = () => {

    const dispatch = useDispatch();

    const {
        comments,
        comment,
        action
    } = useSelector(state => state['commentReducer']);

    useEffect(() => {
        dispatch(getAllComments());
    }, [action,comment]);

    return (
        <div className={css.comment_container}>
            {
                comments.map((comment, index) => <SingleComment key={comment.id} comment={comment} index={index}/>)
            }
        </div>
    );
};

export { CommentPage };
