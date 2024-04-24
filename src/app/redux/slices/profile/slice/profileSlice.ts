import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileSchema } from '@/app/redux/slices/profile/types/profileSchema.ts';
import { fetchUserData } from '@/app/redux/slices/user/thunks/fetchUserData.ts';
import { toast } from 'sonner';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


const initialState: ProfileSchema = {
    isPending: false,
    error    : null,
    profile  : null,
};

export const profileSlice = createSlice({
    name         : 'profile',
    initialState : initialState,
    reducers     : {
        setProfile (state, action: PayloadAction<DomainUserFull>) {
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
            state.error     = action.payload;
            state.profile   = null;
            toast(state.error.errors[0].title, {
                duration   : 5000,
                description: state.error.errors[0].messages[0],
            });
        });
    },
});

export const { actions: profileActions, reducer: profileReducer } = profileSlice;