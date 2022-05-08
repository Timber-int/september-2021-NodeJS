import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../service';
import { CONSTANTS } from '../constants';

export const registrationUser = createAsyncThunk(
    'authSlice/registrationUser',
    async ({ user }, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const registeredUser = await authService.registration(user);

            return registeredUser;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'authSlice/loginUser',
    async (data, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const user = await authService.login(data);

            return user;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        errors: null,
        status: null,
        user: null,
    },
    reducers: {
        logoutUser: (state, action) => {
            state.user = null;
        }
    },
    extraReducers: {
        [registrationUser.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.errors = null;
        },
        [registrationUser.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.user = action.payload;
            state.errors = null;
        },
        [registrationUser.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.error = action.payload;
        },
        [loginUser.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.errors = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.user = action.payload;
            state.errors = null;
        },
        [loginUser.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.errors = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;

const { logoutUser } = authSlice.actions;

export const authAction = { logoutUser };

export default authReducer;
