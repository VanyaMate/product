import {
    NotificationSchema,
} from '@/app/redux/slices/notification/types/notificationSchema.ts';
import { createSlice } from '@reduxjs/toolkit';


const initialState: NotificationSchema = {
    connected    : false,
    connecting   : false,
    notifications: [],
};

export const notificationSlice = createSlice({
    name        : 'notification',
    initialState: initialState,
    reducers    : {},
});