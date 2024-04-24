import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import { userActions } from '@/app/redux/slices/user/slice/userSlice.ts';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN, LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';
import {
    assertDomainResponse,
    DomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { DomainServiceResponseError } from 'product-types/dist/error/DomainServiceResponseError';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    assertDomainAuthResponse
} from 'product-types/dist/authorization/DomainAuthResponse';


export type AuthByUsernameProps = {
    login: string;
    password: string;
    remember?: boolean;
}

export type AuthThunkApiConfig = ThunkApiConfig<DomainServiceResponseError>;

export const authByUsername = createAsyncThunk<DomainUser, AuthByUsernameProps, AuthThunkApiConfig>(
    'auth/byUsername',
    async (authData, thunkAPI) => {
        const { extra: { api }, rejectWithValue, dispatch } = thunkAPI;
        try {
            const user = await api
                .post<DomainResponse>('/v1/authentication/login', authData)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainAuthResponse(data, 'data', 'DomainAuthResponse');
                    dispatch(userActions.setAuthData(data.user));
                    localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, data.tokens[0]);
                    localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, data.tokens[1]);
                    return data.user;
                });
            return user;
        } catch (e: unknown) {
            return thunkCatch(e, rejectWithValue);
        }
    },
);