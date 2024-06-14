import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import {
    assertDomainNotificationPrivateDialogueCreateData,
    DomainNotificationPrivateDialogueCreateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueCreateData';


export const createPrivateDialogue = createAsyncThunk<DomainNotificationPrivateDialogueCreateData, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-dialogues/createPrivateDialogue',
    async (userId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateDialogue = await api
                .post(`/v1/private-dialogue/${ userId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateDialogueCreateData(data, 'data', 'DomainNotificationPrivateDialogueCreateData');
                    return data;
                });

            return privateDialogue;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);