import React from 'react';
import { Link } from 'react-router-dom';
import css from './User.module.css';

const User = ({
    user,
    index
}) => {
    const {
        id,
        firstName,
        lastName,
    } = user;
    return (
        <div className={css.user_box}>
            <div>{index + 1}) {firstName} {lastName}</div>
            <div><Link to={'users/' + id} state={user}><button>Information</button></Link></div>
        </div>
    );
};

export { User };
