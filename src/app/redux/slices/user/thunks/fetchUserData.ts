import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import { DomainServiceResponseError, DomainUserFull } from 'product-types';
import { isDomainResponse } from 'product-types/dist/response/DomainResponse';


export type FetchUserDataProps = {
    login: string;
}

export const fetchUserData = createAsyncThunk<DomainUserFull, FetchUserDataProps, ThunkApiConfig<DomainServiceResponseError>>(
    'profile/fetchUserData',
    async (userData, thunkAPI) => {
        const { rejectWithValue, extra: { api } } = thunkAPI;
        try {
            return api
                .get(`/v1/user/full/${ userData.login }`)
                .then((response) => response.data)
                .then((data) => {
                    if (isDomainResponse(data)) {
                        return data.data;
                    }
                    return data;
                });

        } catch (e) {
            return thunkCatch(e, rejectWithValue);
        }
    },
);