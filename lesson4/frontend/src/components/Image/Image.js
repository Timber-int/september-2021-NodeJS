import React from 'react';

import css from './Image.module.css';

const Image = ({ slider }) => {
    return (
        <>
            <img className={css.image_travel} src={slider.image} alt="image"/>
        </>
    );
};

export { Image };
