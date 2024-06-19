import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';


export const removePrivateMessageSearch = createAsyncThunk<void, string, ThunkApiConfig<DomainServiceResponseError>>(
    'private-messages-search/removePrivateMessageSearch',
    () => {
    },
);