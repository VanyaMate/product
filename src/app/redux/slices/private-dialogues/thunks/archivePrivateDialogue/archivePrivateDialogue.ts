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
    assertDomainPrivateDialogueWithUser,
    DomainPrivateDialogueWithUser,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueWithUser';


export const archivePrivateDialogue = createAsyncThunk<DomainPrivateDialogueWithUser, string, ThunkApiConfig<DomainServiceResponseError>>(
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
                    assertDomainPrivateDialogueWithUser(data, 'data', 'DomainPrivateDialogueWithUser');
                    return data;
                });

            return privateDialogue;
        } catch (e: unknown) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);