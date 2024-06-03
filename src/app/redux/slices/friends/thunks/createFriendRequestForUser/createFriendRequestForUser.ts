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
    assertDomainNotificationFriendRequestData,
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';


export type CreateFriendRequestForUserApiThunk = ThunkApiConfig<DomainServiceResponseError>;


export const createFriendRequestForUser = createAsyncThunk<DomainNotificationFriendRequestData, string, CreateFriendRequestForUserApiThunk>(
    'friends/createFriendRequest',
    async (userId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const friendRequest = await api
                .post<DomainResponse>(`/v1/friend/${ userId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationFriendRequestData(data, 'data', 'DomainNotificationFriendRequestData');
                    return data;
                });
            return friendRequest;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);