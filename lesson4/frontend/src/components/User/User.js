import React from 'react';
import { Link } from 'react-router-dom';

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
        <div>
            <div>{index + 1}) {firstName} {lastName}<span><Link to={'users/' + id} state={user}><button>Information</button></Link></span></div>
        </div>
    );
};

export { User };
