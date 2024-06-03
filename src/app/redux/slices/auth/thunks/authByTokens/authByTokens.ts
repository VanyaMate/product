import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import {
    assertDomainResponse,
    DomainResponse,
} from 'product-types/dist/response/DomainResponse';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainUser,
    DomainUser,
} from 'product-types/dist/user/DomainUser';
import { toast } from 'sonner';
import { i18nConfig } from '@/app/i18n/config/i18n.ts';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_DATA,
} from '@/app/redux/slices/user/consts/storage.const.ts';


export type AuthThunkApiConfig = ThunkApiConfig<DomainServiceResponseError>;

export const authByTokens = createAsyncThunk<DomainUser, null, AuthThunkApiConfig>(
    'auth/byTokens',
    async (_, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            if (!localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN)) {
                return null;
            }

            const user = await api
                .get<DomainResponse>('/v1/authentication')
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainUser(data, 'data', 'DomainUser');
                    localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(data));
                    toast(i18nConfig.t('auth_success_title'), { duration: 3000 });
                    return data;
                });
            return user;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);