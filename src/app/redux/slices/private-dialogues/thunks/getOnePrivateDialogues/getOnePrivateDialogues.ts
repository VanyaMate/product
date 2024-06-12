import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    assertDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';
import {
    assertDomainPrivateDialogueFull,
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';


export const getOnePrivateDialogues = createAsyncThunk<DomainPrivateDialogueFull, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-dialogues/getOnePrivateDialogues',
    async (dialogueId, thunkAPI) => {
        const { rejectWithValue, extra: { api } } = thunkAPI;
        try {
            return api
                .get(`/v1/private-dialogues/${ dialogueId }`)
                .then((response) => response.data)
                .then((data) => {
                    assertDomainResponse(data, 'data', 'DomainResponse');
                    assertDomainPrivateDialogueFull(data.data, 'data', 'DomainPrivateDialogueFull');
                    return data.data;
                });
        } catch (e) {
            throw thunkCatch(e, rejectWithValue);
        }
    },
);