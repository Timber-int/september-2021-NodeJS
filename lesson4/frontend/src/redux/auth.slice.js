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
            await authService.registration(user);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        error: null,
        status: null,
    },
    extraReducers: {
        [registrationUser.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.error = null;
        },
        [registrationUser.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.error = null;
        },
        [registrationUser.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.error = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;

export default authReducer;
