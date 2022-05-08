import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserComment, UserPost } from '../../components';
import css from './UserDetailsPage.module.css';

const UserDetailsPage = () => {

    const { state } = useLocation();

    const {
        firstName,
        lastName,
        phone,
        email,
        posts,
        role,
        comments,
    } = state;

    return (
        <div>

            <div className={css.user_details_box}>
                <div>FirstName: {firstName}</div>
                <div>LastName: {lastName}</div>
                <div>Email: {email}</div>
                <div>Phone: {phone}</div>
                <div>Role: {role}</div>
            </div>

            <div className={css.info_container}>
                <div className={css.post_container}>
                    Posts:
                    {
                        posts && posts.length ? <>{posts.map(post => <UserPost key={post.id} post={post}/>)}</> : <></>
                    }
                </div>
                <div className={css.comment_container}>
                    Comments:
                    {
                        comments && comments.length ?
                            <>{comments.map(comment => <UserComment key={comment.id} comment={comment}/>)}</> : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export { UserDetailsPage };
