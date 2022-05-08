import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../redux';

import css from './Layout.module.css';

const Layout = () => {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logOut = () => {
        logout(() => navigate('/registration', { replace: true }));

        dispatch(authAction.logoutUser());
    };

    const { user } = useSelector(state => state['authReducer']);

    return (
        <div>
            <div className={css.header}>
                <NavLink to={'/users'}>Users</NavLink>
                <NavLink to={'/posts'}>Posts</NavLink>
                <NavLink to={'/comments'}>Comments</NavLink>
                {user ? <></> : <NavLink to={'/registration'}>Registration</NavLink>}
                <NavLink to={'/images'}>Images</NavLink>
                {user ? <></> : <NavLink to={'/login'}>Login</NavLink>}
                <button className={css.logout_button} onClick={logOut}>Logout</button>
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
            <div className={css.footer}>

            </div>
        </div>
    );
};

export { Layout };
