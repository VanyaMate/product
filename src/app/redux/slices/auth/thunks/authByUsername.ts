import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthErrorType, User, userActions } from '@/app';
import axios from 'axios';
import { isAxiosError } from '@/app/type-guards/axios/isAxiosError.ts';
import { isApiResponseError } from '@/app/type-guards/api/isApiResponseError.ts';


export type AuthByUsernameProps = {
    username: string;
    password: string;
    remember?: boolean;
}

export type AuthThunkApiConfig = {
    rejectValue: AuthErrorType | null;
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
        } catch (e: unknown) {
            if (isAxiosError(e)) {
                const errorData = e.response.data;
                if (isApiResponseError(errorData)) {
                    return thunkAPI.rejectWithValue({
                        code   : e.status,
                        message: errorData.message,
                    });
                }
                return thunkAPI.rejectWithValue({
                    code   : e.status,
                    message: e.message,
                });
            }
            return thunkAPI.rejectWithValue({
                code   : 500,
                message: 'Unknown error',
            });
        }
    },
);