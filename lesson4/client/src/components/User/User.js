import React from 'react';

const User = ({user}) => {
    const {firstName,lastName,email,age}=user;

    return (
        <div>
            <div>Name: {firstName} {lastName}</div>
            <div>Age: {age}</div>
            <div>Email: {email}</div>
            <hr/>
        </div>
    );
};

export { User };
