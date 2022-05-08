import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useAuth } from '../../components/hooks/useAuth';
import { loginDataValidator } from '../../validator';
import css from './LoginPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux';

const LoginPage = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    const { state } = useLocation();

    const dispatch = useDispatch();

    const {
        user: userFormDB,
        errors: serverError
    } = useSelector(state => state['authReducer']);

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(loginDataValidator),
        mode: 'onTouched',
    });

    const submit = (user) => {
        dispatch(loginUser(user));

    };
    useEffect(() => {
        if (userFormDB) {
            login(userFormDB, () => navigate(state.pathname, { replace: true }));
        }
    }, [userFormDB]);

    return (<div className={css.login_container}>
            <div className={css.error_box}>
            {serverError && <center><h1><span className={css.error_span}>Wrong email or password!!!</span></h1></center>}
            </div>
            <div className={css.login_box}>
                <form onSubmit={handleSubmit(submit)}>
                    <div>Email:</div>
                    <div><label> <input type="text" {...register('email')} placeholder={'email'}/></label></div>
                    {errors.email && <span className={css.error_span}>{errors.email.message}</span>}
                    <div>Password:</div>
                    <div><label> <input type="password" {...register('password')} placeholder={'password'}/></label></div>
                    {errors.password && <span className={css.error_span}>{errors.password.message}</span>}
                    <div><label><input className={css.login_button} type="submit" value={'Login'}/></label></div>
                </form>
            </div>
        </div>
    );
};

export { LoginPage };
