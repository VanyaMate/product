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
    assertDomainNotificationPrivateDialogueArchiveData,
    DomainNotificationPrivateDialogueArchiveData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueArchiveData';


export const archivePrivateDialogue = createAsyncThunk<DomainNotificationPrivateDialogueArchiveData, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-dialogues/archivePrivateDialogue',
    async (dialogueId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateDialogue = await api
                .post(`/v1/private-dialogue/archive/${ dialogueId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'responseData', 'DomainResponse');
                    return data.data;
                })
                .then((data: unknown) => {
                    assertDomainNotificationPrivateDialogueArchiveData(data, 'data', 'DomainNotificationPrivateDialogueArchiveData');
                    return data;
                });

            return privateDialogue;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);