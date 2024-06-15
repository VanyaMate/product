import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    assertDomainNotificationPrivateMessageData,
    DomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageData';
import {
    DomainMessageCreateData,
} from 'product-types/dist/message/DomainMessageCreateData';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';


export const sendPrivateMessage = createAsyncThunk<DomainNotificationPrivateMessageData, [ string, DomainMessageCreateData ], ThunkApiConfig<DomainServiceResponseError>>(
    'private-messages/sendPrivateMessage',
    async ([ dialogueId, createData ], thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateMessage = await api
                .post(`/v1/private-message/${ dialogueId }`, createData)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateMessageData(data, 'data', 'DomainNotificationPrivateMessageData');
                    return data;
                });

            return privateMessage;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);