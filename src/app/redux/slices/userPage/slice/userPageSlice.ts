import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    UserPageSchema,
} from '@/app/redux/slices/userPage/types/userPageSchema.ts';
import {
    fetchUserPageData,
} from '@/app/redux/slices/userPage/thunks/fetchUserPageData.ts';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';


const initialState: UserPageSchema = {
    isPending: false,
    error    : null,
    user     : null,
};

export const userPageSlice = createSlice({
    name         : 'userPage',
    initialState : initialState,
    reducers     : {
        setProfile (state, action: PayloadAction<DomainUserFull>) {
            state.user = action.payload;
        },
        removeProfile (state) {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserPageData.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.user      = action.payload;
        });
        builder.addCase(fetchUserPageData.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(fetchUserPageData.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
            state.user      = null;
        });
    },
});

export const {
                 actions: userPageActions,
                 reducer: userPageReducer,
             } = userPageSlice;