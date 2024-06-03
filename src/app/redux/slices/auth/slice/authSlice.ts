import { createSlice } from '@reduxjs/toolkit';
import {
    authByUsername,
} from '@/app/redux/slices/auth/thunks/authByUsername/authByUsername.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';
import {
    authByTokens,
} from '@/app/redux/slices/auth/thunks/authByTokens/authByTokens.ts';
import { logout } from '@/app/redux/slices/auth/thunks/logout/logout.ts';


const initialState: AuthSchema = {
    isPending: false,
    error    : null,
    user     : null,
};

export const authSlice = createSlice({
    name         : 'auth',
    initialState : initialState,
    reducers     : {},
    extraReducers: (builder) => {
        // authByUsername
        builder.addCase(authByUsername.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.user      = action.payload ?? null;
        });
        builder.addCase(authByUsername.pending, (state) => {
            state.isPending = true;
            state.error     = null;
            state.user      = null;
        });
        builder.addCase(authByUsername.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
            state.user      = null;
        });

        // authByTokens
        builder.addCase(authByTokens.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.user      = action.payload ?? null;
        });
        builder.addCase(authByTokens.pending, (state) => {
            state.isPending = true;
            state.error     = null;
            state.user      = null;
        });
        builder.addCase(authByTokens.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
            state.user      = null;
        });

        // logout
        // authByTokens
        builder.addCase(logout.fulfilled, (state) => {
            state.isPending = false;
            state.error     = null;
            state.user      = null;
        });
        builder.addCase(logout.pending, (state) => {
            state.isPending = true;
            state.error     = null;
            state.user      = null;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
            state.user      = null;
        });
    },
});

export const { actions: authActions, reducer: authReducer } = authSlice;