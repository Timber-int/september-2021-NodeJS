import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { SliderData } from '../../imagesDirectory';
import { Image } from '../../components';
import css from './ImagePage.module.css';

const ImagePage = () => {
    const [current, setCurrent] = useState(0);

    const length = SliderData.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }

    return (
        <section className={css.slider}>
            < FaArrowAltCircleLeft className={css.left_arrow} onClick={prevSlide}/>
            < FaArrowAltCircleRight className={css.right_arrow} onClick={nextSlide}/>
            {
                SliderData.map((slider, index) => <div className={index === current ? css.slide_active : css.slide} key={index}>
                        {index === current && (<Image key={index} slider={slider}/>)}
                    </div>
                )
            }
        </section>
    );
};

export { ImagePage };

