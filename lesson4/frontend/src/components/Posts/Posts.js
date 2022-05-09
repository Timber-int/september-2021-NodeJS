import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../../constants';
import { getAllPosts } from '../../redux';
import { Post } from '../Post/Post';
import css from './Posts.module.css';
import { useForm } from 'react-hook-form';
import { FormPostCreate } from '../FormPostCreate/FormPostCreate';

const Posts = () => {

    const [searchData, setSearchData] = useState('');

    const {
        posts,
        errors,
        status,
        post,
    } = useSelector(state => state['postReducer']);

    const {
        user
    } = useSelector(state => state['authReducer']);
    const {
        comment
    } = useSelector(state => state['commentReducer']);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
    } = useForm();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [searchData, user, post, comment]);

    const submit = (data) => {
        setSearchData(data.title);
    };

    return (
        <div>
            {errors && <center><h1>{errors}</h1></center>}

            <div className={css.posts_form_container}>
                <form className={css.posts_form} onSubmit={handleSubmit(submit)}>
                    <input type="text" {...register('title')} placeholder={'Search by title...'}/>
                    <input className={css.posts_form_button} type="submit" value={'Search'}/>
                </form>
            </div>

            <div className={css.posts_container}>
                {
                    [...posts].filter(post => post.title.toUpperCase()
                        .includes(searchData?.toUpperCase()))
                        .map((post, index) => <Post key={post.id} user={user} post={post} index={index}/>)
                }
            </div>

            <div className={css.post_create_form}>
                <FormPostCreate user={user}/>
            </div>

        </div>
    );
};

export { Posts };
