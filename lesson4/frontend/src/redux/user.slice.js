import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../service';
import { CONSTANTS } from '../constants';

export const getAllUsers = createAsyncThunk(
    'userSlice/getAllUsers',
    async (_, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const users = await userService.getAll();

            return users;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        users: [],
        error: null,
        status: null,

    },
    extraReducers: {
        [getAllUsers.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.error = null;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.users = action.payload;
            state.error = null;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.error = action.payload;
        }
    }

});

const userReducer = userSlice.reducer;

const {} = userSlice.actions;

export const userAction = {};

export default userReducer;
