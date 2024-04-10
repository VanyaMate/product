import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthErrorType, User } from '@/app';
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
            return await axios.post('http://localhost:8000/login', authData);
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