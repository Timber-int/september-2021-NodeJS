import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../../constants';
import { getAllPosts } from '../../redux';
import { Post } from '../Post/Post';
import css from './Posts.module.css';
import { useForm } from 'react-hook-form';

const Posts = () => {

    const [searchData, setSearchData] = useState('');

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const {
        posts,
        error,
        status
    } = useSelector(state => state['postReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [searchData]);

    const submit = (data) => {
        setSearchData(data.title);
    };

    return (
        <div>
            {status === CONSTANTS.LOADING && <div className="movies_list-loading">Loading</div>}
            {error && <center><h1>{error}</h1></center>}

            <div className={css.posts_form_container} >
                <form className={css.posts_form} onSubmit={handleSubmit(submit)}>
                    <input type="text" {...register('title')} placeholder={'Search by title...'}/>
                    <input className={css.posts_form_button}  type="submit" value={'Search'}/>
                </form>
            </div>
            <div className={css.posts_container}>
                {
                    [...posts].filter(post => post.title.toUpperCase().includes(searchData?.toUpperCase()))
                        .map((post, index) => <Post key={post.id} post={post} index={index}/>)
                }
            </div>

        </div>
    );
};

export { Posts };
