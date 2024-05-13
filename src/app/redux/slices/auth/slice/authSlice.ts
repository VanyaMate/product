import { createSlice } from '@reduxjs/toolkit';
import {
    authByUsername,
} from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';


const initialState: AuthSchema = {
    isPending: false,
    error    : null,
};

export const authSlice = createSlice({
    name         : 'auth',
    initialState : initialState,
    reducers     : {},
    extraReducers: (builder) => {
        builder.addCase(authByUsername.fulfilled, (state) => {
            state.isPending = false;
            state.error     = null;
        });
        builder.addCase(authByUsername.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(authByUsername.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });
    },
});

export const { actions: authActions, reducer: authReducer } = authSlice;