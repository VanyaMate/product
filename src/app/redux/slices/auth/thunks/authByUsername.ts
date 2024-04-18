import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthErrorType, User, userActions } from '@/app';
import { isAxiosError } from '@/app/type-guards/axios/isAxiosError.ts';
import { isApiResponseError } from '@/app/type-guards/api/isApiResponseError.ts';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';


export type AuthByUsernameProps = {
    username: string;
    password: string;
    remember?: boolean;
}

export type AuthThunkApiConfig = ThunkApiConfig<AuthErrorType>;

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
            if (isAxiosError(e)) {
                const response  = e.response;
                const errorData = response.data;
                if (isApiResponseError(errorData)) {
                    return rejectWithValue({
                        code   : response.status,
                        message: errorData.message,
                    });
                }
                return rejectWithValue({
                    code   : response.status,
                    message: e.message,
                });
            }
            return rejectWithValue({
                code   : 500,
                message: 'Unknown error',
            });
        }
    },
);