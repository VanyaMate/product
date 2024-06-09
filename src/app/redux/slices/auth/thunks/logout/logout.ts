import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import {
    DomainResponse,
} from 'product-types/dist/response/DomainResponse';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';


export const logout = createAsyncThunk<void, null, ThunkApiConfig<DomainServiceResponseError>>(
    'auth/logout',
    async (_, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            await api
                .post<DomainResponse>('/v1/authentication/logout')
                .finally(() => {
                    localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
                    localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN);
                });
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);