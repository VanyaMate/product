import { createSlice } from '@reduxjs/toolkit';
import { authByUsername } from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { toast } from 'sonner';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';
import { i18nConfig } from '@/app/i18n/config/i18n.ts';


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
            toast(i18nConfig.t('auth_success_title'), { duration: 3000 });
        });
        builder.addCase(authByUsername.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(authByUsername.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload ?? {
                code   : 500,
                message: 'Unknown error',
            };
            toast(i18nConfig.t('auth_error_title'), {
                duration: 5000, description: state.error.message,
            });
        });
    },
});

export const { actions: authActions, reducer: authReducer } = authSlice;