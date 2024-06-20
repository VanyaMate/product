import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    assertDomainNotificationPrivateDialogueArchiveData,
    DomainNotificationPrivateDialogueArchiveData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateDialogueArchiveData';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';


export const unArchivePrivateDialogue = createAsyncThunk<DomainNotificationPrivateDialogueArchiveData, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-dialogues/unArchivePrivateDialogue',
    async (dialogueId, thunkAPI) => {
        const { extra: { api }, rejectWithValue } = thunkAPI;
        try {
            const privateDialogue = await api
                .post(`/v1/private-dialogue/un-archive/${ dialogueId }`)
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