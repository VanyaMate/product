import { createSlice } from '@reduxjs/toolkit';


const initialState: Current = {
    authData: null,
};

export const userSlice = createSlice({
    name        : 'user',
    initialState: initialState,
    reducers    : {},
});

export const { actions: userActions, reducer: userReducer } = userSlice;