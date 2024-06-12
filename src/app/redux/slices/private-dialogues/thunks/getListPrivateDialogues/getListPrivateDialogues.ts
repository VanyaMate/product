import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import {
    DomainPrivateDialogueFull, isDomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';


export type GetListPrivateDialoguesProps = DomainSearchItemOptions;

export const getListPrivateDialogues = createAsyncThunk<DomainPrivateDialogueFull[], GetListPrivateDialoguesProps, ThunkApiConfig<DomainServiceResponseError>>(
    'private-dialogues/getListPrivateDialogues',
    async (options, thunkAPI) => {
        const { rejectWithValue, extra: { api } } = thunkAPI;
        try {
            const convertedOptions: Record<string, string> = {};

            Object.entries(options).forEach(([ key, value ]) => {
                convertedOptions[key] = value.toString();
            });

            return api
                .get(`/v1/private-dialogues/list/?${ new URLSearchParams(convertedOptions).toString() }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'data', 'DomainResponse');
                    return Array.isArray(data.data)
                           ? data.data.filter(isDomainPrivateDialogueFull)
                           : [];
                });
        } catch (e) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);