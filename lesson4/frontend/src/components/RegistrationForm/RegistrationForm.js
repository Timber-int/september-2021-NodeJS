import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userBodyForRegistrationValidator } from '../../validator';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';
import { registrationUser } from '../../redux';

import css from './RegistrationForm.module.css';

const RegistrationForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { user } = useSelector(state => state['authReducer']);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(userBodyForRegistrationValidator),
        mode: 'onTouched'
    });

    const submit = (data) => {
        dispatch(registrationUser({ user: data }));
        reset();
    };

    useEffect(() => {
        if (user) {
            navigate('/users', { replace: true });
        }
    }, [user]);

    return (
        <div className={css.registration_form_container}>
            <form className={css.registration_form} onSubmit={handleSubmit(submit)}>
                <div>FirstName:</div>
                <div><label><input type="text" {...register('firstName')} placeholder={'firstName'}/></label></div>
                {errors.firstName && <span>{errors.firstName.message}</span>}
                <div>LastName:</div>
                <div><label> <input type="text" {...register('lastName')} placeholder={'lastName'}/></label></div>
                {errors.lastName && <span>{errors.lastName.message}</span>}
                <div>Age:</div>
                <div><label> <input type="number" {...register('age')} placeholder={'age'}/></label></div>
                {errors.age && <span>{errors.age.message}</span>}
                <div>Email:</div>
                <div><label> <input type="text" {...register('email')} placeholder={'email'}/></label></div>
                {errors.email && <span>{errors.email.message}</span>}
                <div>Password:</div>
                <div><label><input type="password" {...register('password')} placeholder={'password'}/></label></div>
                {errors.password && <span>{errors.password.message}</span>}
                <div>Phone:</div>
                <div><label> <input type="text" {...register('phone')} placeholder={'phone'}/></label></div>
                {errors.phone && <span>{errors.phone.message}</span>}
                <div>
                    <label>
                        <input className={css.registration_button} type="submit"
                               value={'Register'}/>
                    </label>
                </div>

            </form>
        </div>
    );
};

export { RegistrationForm };
