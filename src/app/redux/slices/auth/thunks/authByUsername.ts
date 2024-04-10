import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthErrorType, User, userActions } from '@/app';
import axios, { AxiosError } from 'axios';


export type AuthByUsernameProps = {
    username: string;
    password: string;
    remember?: boolean;
}

export type AuthThunkApiConfig = {
    rejectValue: AuthErrorType | null;
}

export type ServerErrorResponse = {
    message: string;
}

export const authByUsername = createAsyncThunk<User, AuthByUsernameProps, AuthThunkApiConfig>(
    'auth/byUsername',
    async (authData, thunkAPI) => {
        try {
            const user = await axios
                .post<User>('http://localhost:8000/login', authData)
                .then((response) => response.data);

            thunkAPI.dispatch(userActions.setAuthData(user));
            return user;
        } catch (e: any) {
            const error: AxiosError<ServerErrorResponse, any> = e as AxiosError<ServerErrorResponse, any>;
            if (error?.response) {
                return thunkAPI.rejectWithValue({
                    code   : error.response.status,
                    message: error.response.data.message,
                });
            } else {
                return thunkAPI.rejectWithValue({
                    code   : 500,
                    message: e?.message ?? 'Unknown error',
                });
            }
        }
    },
);