import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import { ThunkError } from '@/app/redux/types/thunkError.ts';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import { User } from '@/app/types/user';
import { userActions } from '@/app/redux/slices/user/slice/userSlice.ts';


export type AuthByUsernameProps = {
    username: string;
    password: string;
    remember?: boolean;
}

export type AuthThunkApiConfig = ThunkApiConfig<ThunkError>;

export const authByUsername = createAsyncThunk<User, AuthByUsernameProps, AuthThunkApiConfig>(
    'auth/byUsername',
    async (authData, thunkAPI) => {
        const { extra: { api }, rejectWithValue, dispatch } = thunkAPI;
        try {
            const user = await api
                .post<User>('/login', authData)
                .then((response) => response.data);

            dispatch(userActions.setAuthData(user));
            return user;
        } catch (e: unknown) {
            return thunkCatch(e, rejectWithValue);
        }
    },
);