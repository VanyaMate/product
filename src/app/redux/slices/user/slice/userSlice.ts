import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_DATA, LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '../consts/storage.const.ts';
import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import {
    DomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';


const initialState: UserSchema = {
    data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA) ?? 'null'),
};

export const userSlice = createSlice({
    name        : 'user',
    initialState: initialState,
    reducers    : {
        setAuthData (state, action: PayloadAction<DomainAuthResponse>) {
            state.data = action.payload.user;
            localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(action.payload.user));
            localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, action.payload.tokens[0]);
            localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, action.payload.tokens[1]);
        },
        removeAuthData (state) {
            state.data = null;
            localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
            localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN);
        },
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;