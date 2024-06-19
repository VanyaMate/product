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
    assertDomainNotificationPrivateMessageReadAllData,
    DomainNotificationPrivateMessageReadAllData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageReadAllData';


export const readAllPrivateMessage = createAsyncThunk<DomainNotificationPrivateMessageReadAllData, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-messages',
    async (dialogueId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateMessage = await api
                .get(`/v1/private-message/all/${ dialogueId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateMessageReadAllData(data, 'data', 'DomainNotificationPrivateMessageReadAllData');
                    return data;
                });

            return privateMessage;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);