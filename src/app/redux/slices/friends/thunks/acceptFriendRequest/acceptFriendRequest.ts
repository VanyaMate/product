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
    assertDomainNotificationFriendRequestAcceptedData,
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';


export type AcceptFriendRequestApiThunk = ThunkApiConfig<DomainServiceResponseError>;


export const acceptFriendRequest = createAsyncThunk<DomainNotificationFriendRequestAcceptedData, string, AcceptFriendRequestApiThunk>(
    'friends/acceptFriendRequest',
    async (requestId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const friendRequest = await api
                .post<DomainResponse>(`/v1/friend/accept/${ requestId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationFriendRequestAcceptedData(data, 'data', 'DomainNotificationFriendRequestAcceptedData');
                    return data;
                });
            return friendRequest;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);