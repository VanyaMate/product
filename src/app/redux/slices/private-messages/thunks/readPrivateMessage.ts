import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    assertDomainNotificationPrivateMessageReadData,
    DomainNotificationPrivateMessageReadData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageReadData';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';


export const readPrivateMessage = createAsyncThunk<DomainNotificationPrivateMessageReadData, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-messages/readPrivateMessage',
    async (messageId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateMessage = await api
                .get(`/v1/private-message/${ messageId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateMessageReadData(data, 'data', 'DomainNotificationPrivateMessageReadData');
                    return data;
                });

            return privateMessage;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);