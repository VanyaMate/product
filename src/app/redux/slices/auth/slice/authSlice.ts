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
            state.error     = action.payload;
            toast(state.error.errors[0].title, {
                duration   : 5000,
                description: state.error.errors[0].messages[0],
            });
        });
    },
});

export const { actions: authActions, reducer: authReducer } = authSlice;