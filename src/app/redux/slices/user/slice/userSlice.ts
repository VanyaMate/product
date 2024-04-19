import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    LOCAL_STORAGE_USER_AUTH_KEY,
    LOCAL_STORAGE_USER_DATA,
} from '../consts/storage.const.ts';
import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import { User } from '@/app/types/user';


const initialState: UserSchema = {
    data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_DATA) ?? 'null'),
};

export const userSlice = createSlice({
    name        : 'user',
    initialState: initialState,
    reducers    : {
        setAuthData (state, action: PayloadAction<User>) {
            state.data = action.payload;
            localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(action.payload));
            // TODO: Временное решение для временного сервера
            localStorage.setItem(LOCAL_STORAGE_USER_AUTH_KEY, JSON.stringify(action.payload.username));
        },
        removeAuthData (state) {
            state.data = null;
            localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
            // TODO: Временное решение для временного сервера
            localStorage.removeItem(LOCAL_STORAGE_USER_AUTH_KEY);
        },
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;