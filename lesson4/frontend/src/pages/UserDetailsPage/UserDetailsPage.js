import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserComment, UserPost } from '../../components';

const UserDetailsPage = () => {

    const { state } = useLocation();

    console.log(state);
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
            <div>FirstName: {firstName}</div>
            <div>LastName: {lastName}</div>
            <div>Email: {email}</div>
            <div>Phone: {phone}</div>
            <div>Role: {role}</div>
            <div>
                {
                    posts ? <div>Created Posts: {posts.map(post => <UserPost key={post.id} post={post}/>)}</div> : <></>
                }
                {
                    comments ? <div>Created Comments: {comments.map(comment => <UserComment key={comment.id} comment={comment}/>)}</div> : <></>
                }
            </div>

        </div>
    );
};

export { UserDetailsPage };
