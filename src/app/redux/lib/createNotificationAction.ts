import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';


export const createNotificationAction = function <Notification> (name: string) {
    return createAsyncThunk<Notification, Notification, ThunkApiConfig<DomainServiceResponseError>>(
        name,
        (notification) => {
            return notification;
        },
    );
};