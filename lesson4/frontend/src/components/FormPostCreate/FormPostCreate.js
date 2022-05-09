import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { checkIsPostBodyValidate } from '../../validator';
import css from './FormPostCreate.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux';
import { useNavigate } from 'react-router-dom';

const FormPostCreate = ({ user }) => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(checkIsPostBodyValidate),
        mode: 'onTouched'
    });

    const submitForm = (data) => {
        if (!user) {
            navigate('/login', { replace: true });
            return;
        }

        dispatch(createPost({
            post: {
                ...data,
                userId: user.userId
            }
        }));

        reset();
    };

    return (
        <form className={css.form_box} onSubmit={handleSubmit(submitForm)}>
            <div><label> <input className={css.post_input} type="text" {...register('title')} placeholder={'title'}/></label></div>
            {errors.title && <span className={css.error_span}>{errors.title.message}</span>}
            <div><label> <input className={css.post_input} type="text" {...register('text')} placeholder={'text'}/></label></div>
            {errors.text && <span className={css.error_span}>{errors.text.message}</span>}
            <div><label><input className={css.post_button} type="submit" value={'Create'}/></label></div>
        </form>
    );
};

export { FormPostCreate };
