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
    assertDomainNotificationPrivateDialogueDeletedData,
    DomainNotificationPrivateDialogueDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueDeletedData';


export const removePrivateDialogue = createAsyncThunk<DomainNotificationPrivateDialogueDeletedData, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-dialogues/removePrivateDialogue',
    async (dialogueId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateDialogue = await api
                .delete(`/v1/private-dialogue/${ dialogueId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateDialogueDeletedData(data, 'data', 'DomainNotificationPrivateDialogueDeletedData');
                    return data;
                });

            return privateDialogue;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);