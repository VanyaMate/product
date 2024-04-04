import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '@/components/entities/users/model/types/userSchema.ts';


const initialState: UserSchema = {
    authData: null,
};

export const userSlice = createSlice({
    name        : 'user',
    initialState: initialState,
    reducers    : {},
});

export const { actions: userActions, reducer: userReducer } = userSlice;