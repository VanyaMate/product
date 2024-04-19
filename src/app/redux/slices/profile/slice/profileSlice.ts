import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/app/types/user';
import { ProfileSchema } from '@/app/redux/slices/profile/types/profileSchema.ts';
import { fetchUserData } from '@/app/redux/slices/user/thunks/fetchUserData.ts';
import { toast } from 'sonner';
import { i18nConfig } from '@/app/i18n/config/i18n.ts';


const initialState: ProfileSchema = {
    isPending: false,
    error    : null,
    profile  : null,
};

export const profileSlice = createSlice({
    name         : 'profile',
    initialState : initialState,
    reducers     : {
        setProfile (state, action: PayloadAction<User>) {
            state.profile = action.payload;
        },
        removeProfile (state) {
            state.profile = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.profile   = action.payload;
        });
        builder.addCase(fetchUserData.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload ?? {
                code   : 500,
                message: 'Unknown error',
            };
            state.profile   = null;
            toast(i18nConfig.t('request_error'), {
                duration: 5000, description: state.error.message,
            });
        });
    },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;