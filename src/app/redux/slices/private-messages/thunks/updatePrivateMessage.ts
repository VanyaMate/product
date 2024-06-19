import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    assertDomainNotificationPrivateMessageRedactedData,
    DomainNotificationPrivateMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageRedactedData';
import {
    DomainMessageUpdateData,
} from 'product-types/dist/message/DomainMessageUpdateData';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';


export const updatePrivateMessage = createAsyncThunk<DomainNotificationPrivateMessageRedactedData, [ string, DomainMessageUpdateData ], ThunkApiConfig<DomainServiceResponseError>>(
    'private-messages/update-private-message',
    async ([ messageId, updateData ], thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateMessage = await api
                .patch(`/v1/private-message/${ messageId }`, updateData)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateMessageRedactedData(data, 'data', 'DomainNotificationPrivateMessageRedactedData');
                    return data;
                });

            return privateMessage;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);