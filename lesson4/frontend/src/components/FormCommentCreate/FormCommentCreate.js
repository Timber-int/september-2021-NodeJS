import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { checkIsCommentBodyValidator } from '../../validator';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux';
import css from './FormCommentCreate.module.css';

const FormCommentCreate = ({
    user,
    post
}) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(checkIsCommentBodyValidator),
        mode: 'onTouched'
    });

    const submit = (data) => {

        if (!user) {
            navigate('/login', { replace: true });
            return;
        }

        const comment = {
            ...data,
            authorId: user.userId,
            postId: post.id
        };

        dispatch(createComment({ comment }));

        reset();
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div>Text:</div>
            <div><label><input className={css.comment_form_text} type="text" {...register('text')} placeholder={'text'}/></label></div>
            {errors.text && <span>{errors.text.message}</span>}
            <div><label><input className={css.comment_form_button}  type="submit" value={'Create'}/></label></div>
        </form>
    );
};

export { FormCommentCreate };
