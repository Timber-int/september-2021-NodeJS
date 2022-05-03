import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { Layout } from './components';
import { CommentPage, LoginPage, NotFoundPage, PostPage, RegistrationPage, UserDetailsPage, UserPage } from './pages';

import './App.css';

const App = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route index path={'registration'} element={<RegistrationPage/>}/>
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'users'} element={<UserPage/>}>
                    <Route path={'users/:id'} element={<UserDetailsPage/>}/>
                </Route>
                <Route path={'posts'} element={<PostPage/>}/>
                <Route path={'comments'} element={<CommentPage/>}/>
            </Route>
            <Route path={'*'} element={<NotFoundPage/>}/>
        </Routes>
    );
};

export { App };
