import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    assertDomainNotificationPrivateMessageDeletedData,
    DomainNotificationPrivateMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageDeletedData';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';


export const removePrivateMessage = createAsyncThunk<DomainNotificationPrivateMessageDeletedData, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-messages/remove-private-message',
    async (messageId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateMessage = await api
                .delete(`/v1/private-message/${ messageId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateMessageDeletedData(data, 'data', 'DomainNotificationPrivateMessageDeletedData');
                    return data;
                });

            return privateMessage;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);