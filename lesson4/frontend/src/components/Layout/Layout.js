import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Layout.module.css';

const Layout = () => {
    return (
        <div>
            <div className={css.header}>
                <NavLink to={'/users'}>Users</NavLink>
                <NavLink to={'/posts'}>Posts</NavLink>
                <NavLink to={'/comments'}>Comments</NavLink>
                <NavLink to={'/registration'}>Registration</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
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
