import React from 'react';

const UserComment = ({ comment }) => {

    const {
        text,
        like,
        dislike,
    } = comment;
    return (
        <div>
            <div>
                <span>👍 {like}</span>
                <span>👎 {dislike}</span>
                <div>
                    <text>{text}</text>
                </div>
            </div>
        </div>
    );
};

export { UserComment };
