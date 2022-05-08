import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postService } from '../service';
import { CONSTANTS } from '../constants';

export const createPost = createAsyncThunk(
    'postSlice/createPost',
    async (post, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            await postService.create(post);

        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getAllPosts = createAsyncThunk(
    'postSlice/getAllPosts',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const posts = await postService.getAll();

            return posts;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        posts: [],
        error: null,
        status: null,
    },
    extraReducers: {
        [getAllPosts.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.error = null;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.posts = action.payload;
            state.error = null;
        },
        [getAllPosts.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.error = action.payload;
        }
    }
});

const postReducer = postSlice.reducer;

export default postReducer;
