import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';
import authReducer from './auth.slice';
import postReducer from './post.slice';

export const store = configureStore({
    reducer: {
        userReducer,
        authReducer,
        postReducer,
    },
});
