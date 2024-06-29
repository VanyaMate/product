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
    assertDomainSearchItem,
    DomainSearchItem,
} from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';


export const getMessagesByQuery = createAsyncThunk<DomainSearchItem, [ string, DomainSearchItemOptions ], ThunkApiConfig<DomainServiceResponseError>>(
    'private-messages/getPrivateMessagesByQuery',
    async ([ dialogueId, options ], thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const convertedOptions: Record<string, string> = {};

            Object.entries(options).forEach(([ key, value ]) => {
                convertedOptions[key] = value.toString();
            });

            const privateMessages = await api
                .get(`/v1/private-messages/${ dialogueId }?${ new URLSearchParams(convertedOptions).toString() }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainSearchItem(data, 'data', 'DomainSearchItem');
                    return data;
                });

            return privateMessages;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);