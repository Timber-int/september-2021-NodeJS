import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { Layout } from './components';
import { CommentPage, ImagePage, LoginPage, NotFoundPage, PostPage, RegistrationPage, UserDetailsPage, UserPage } from './pages';

import './App.css';
import { RequireAuth } from './components/hoc/RequireAuth';
import { AuthProvider } from './components/hoc/AuthProvider';

const App = () => {

    return (
        <AuthProvider>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index path={'registration'} element={<RegistrationPage/>}/>
                    <Route path={'login'} element={<LoginPage/>}/>
                    <Route path={'images'} element={<ImagePage/>}/>

                    <Route path={'users'} element={<RequireAuth><UserPage/></RequireAuth>}>
                        <Route path={'users/:id'} element={<UserDetailsPage/>}/>
                    </Route>
                    <Route path={'posts'} element={<PostPage/>}/>
                    <Route path={'comments'} element={<CommentPage/>}/>
                </Route>
                <Route path={'*'} element={<NotFoundPage/>}/>
            </Routes>
        </AuthProvider>
    );
};

export { App };
