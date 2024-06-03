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
    assertDomainNotificationFriendDeletedData,
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';


export type RemoveFriendApiThunk = ThunkApiConfig<DomainServiceResponseError>;


export const removeFriend = createAsyncThunk<DomainNotificationFriendDeletedData, string, RemoveFriendApiThunk>(
    'friends/removeFriend',
    async (userId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const friendRequest = await api
                .delete<DomainResponse>(`/v1/friend/remove/${ userId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationFriendDeletedData(data, 'data', 'DomainNotificationFriendDeletedData');
                    return data;
                });
            return friendRequest;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);