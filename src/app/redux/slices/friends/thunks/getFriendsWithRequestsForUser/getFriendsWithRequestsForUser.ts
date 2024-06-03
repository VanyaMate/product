import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    assertDomainFriends,
    DomainFriends,
} from 'product-types/dist/friends/DomainFriends';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
    DomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';


export type GetFriendsWithRequestsForUserApiThunk = ThunkApiConfig<DomainServiceResponseError>;


export const getFriendsWithRequestsForUser = createAsyncThunk<DomainFriends, null, GetFriendsWithRequestsForUserApiThunk>(
    'friends/getFriendsWithRequests',
    async (_, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const user = await api
                .get<DomainResponse>('/v1/friends')
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainFriends(data, 'data', 'DomainFriends');
                    return data;
                });
            return user;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);