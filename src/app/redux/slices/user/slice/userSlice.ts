import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    LOCAL_STORAGE_USER_DATA,
} from '../consts/storage.const.ts';
import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import { DomainUser } from 'product-types';


const initialState: UserSchema = {
    data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA) ?? 'null'),
};

export const userSlice = createSlice({
    name        : 'user',
    initialState: initialState,
    reducers    : {
        setAuthData (state, action: PayloadAction<DomainUser>) {
            state.data = action.payload;
            localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(action.payload));
        },
        removeAuthData (state) {
            state.data = null;
            localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
        },
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;