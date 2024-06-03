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
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    assertDomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';
import { toast } from 'sonner';
import { i18nConfig } from '@/app/i18n/config/i18n.ts';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_DATA, LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';


export type AuthThunkApiConfig = ThunkApiConfig<DomainServiceResponseError>;

export const logout = createAsyncThunk<DomainUser, null, AuthThunkApiConfig>(
    'auth/logout',
    async (_, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            localStorage.removeItem(LOCAL_STORAGE_USER_DATA);
            localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
            localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN);

            const user = await api
                .post<DomainResponse>('/v1/authentication/logout')
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainAuthResponse(data, 'data', 'DomainAuthResponse');
                    toast(i18nConfig.t('auth_success_title'), { duration: 3000 });
                    return data.user;
                });
            return user;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);