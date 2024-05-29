import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import { isDomainResponse } from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import {
    DomainSearchItem,
    isDomainSearchItem,
} from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';


export const fetchSearchUsersByLoginStart = createAsyncThunk<DomainSearchItem, DomainSearchItemOptions, ThunkApiConfig<DomainServiceResponseError>>(
    'search/fetchSearchUsersByLoginStart',
    async (options, thunkAPI) => {
        const { rejectWithValue, extra: { api } } = thunkAPI;
        try {
            const convertedOptions: Record<string, string> = {};

            Object.entries(options).forEach(([ key, value ]) => {
                convertedOptions[key] = value.toString();
            });

            return api
                .get(`/v1/search/users/?${ new URLSearchParams(convertedOptions).toString() }`)
                .then((response) => response.data)
                .then((data) => {
                    if (isDomainResponse(data)) {
                        if (isDomainSearchItem(data.data)) {
                            return data.data;
                        }
                    }
                    return data;
                });
        } catch (e) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);