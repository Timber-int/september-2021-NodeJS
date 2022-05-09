import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { commentService } from '../service';
import { CONSTANTS } from '../constants';

export const createComment = createAsyncThunk(
    'commentSlice/createComment',
    async ({ comment }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const createdComment = await commentService.create(comment);

            return createdComment;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const getAllComments = createAsyncThunk(
    'commentSlice/getAllComments',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const comments = await commentService.getAll();

            return comments;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createActionComment = createAsyncThunk(
    'commentSlice/createActionComment',
    async (data, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const action = await commentService.action(data);

            return action;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        comments: [],
        errors: null,
        status: null,
        comment: null,
        action: null,
    },
    extraReducers: {
        [getAllComments.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.errors = null;
        },
        [getAllComments.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.comments = action.payload;
            state.errors = null;
        },
        [getAllComments.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.errors = action.payload;
        },
        [createComment.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.errors = null;
        },
        [createComment.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.comment = action.payload;
            state.errors = null;
        },
        [createComment.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.errors = action.payload;
        },
        [createActionComment.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.errors = null;
        },
        [createActionComment.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.action = action.payload;
            state.errors = null;
        },
        [createActionComment.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.errors = action.payload;
        }
    }
});

const commentReducer = commentSlice.reducer;

export default commentReducer;
