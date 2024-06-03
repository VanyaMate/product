import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
    DomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import {
    assertDomainNotificationFriendRequestCanceledData,
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';


export type CancelFriendRequestApiThunk = ThunkApiConfig<DomainServiceResponseError>;


export const cancelFriendRequest = createAsyncThunk<DomainNotificationFriendRequestCanceledData, string, CancelFriendRequestApiThunk>(
    'friends/cancelFriendRequest',
    async (requestId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const friendRequest = await api
                .delete<DomainResponse>(`/v1/friend/cancel/${ requestId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationFriendRequestCanceledData(data, 'data', 'DomainNotificationFriendRequestCanceledData');
                    return data;
                });
            return friendRequest;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);