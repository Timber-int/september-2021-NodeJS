import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postService } from '../service';
import { CONSTANTS } from '../constants';

export const createPost = createAsyncThunk(
    'postSlice/createPost',
    async ({ post }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const createdPost = await postService.create(post);

            return createdPost;
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
        errors: null,
        status: null,
        post: null,
    },
    extraReducers: {
        [getAllPosts.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.errors = null;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.posts = action.payload;
            state.errors = null;
        },
        [getAllPosts.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.errors = action.payload;
        },
        [createPost.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.errors = null;
        },
        [createPost.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.post = action.payload;
            state.errors = null;
        },
        [createPost.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.errors = action.payload;
        }
    }
});

const postReducer = postSlice.reducer;

export default postReducer;
