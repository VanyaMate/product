import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    NotificationsSchema,
} from '@/app/redux/slices/notifications/types/notifications.schema.ts';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { logout } from '@/app/redux/slices/auth/thunks/logout/logout.ts';


const initialState: NotificationsSchema = {
    notifications: [],
    settings     : {
        [DomainNotificationType.ERROR]                          : {
            sound: false,
            mark : false,
        },
        [DomainNotificationType.UNKNOWN]                        : {
            sound: false,
            mark : false,
        },
        [DomainNotificationType.CONNECTED]                      : {
            sound: false,
            mark : false,
        },
        [DomainNotificationType.CONNECTING]                     : {
            sound: false,
            mark : false,
        },
        [DomainNotificationType.DISCONNECTED]                   : {
            sound: false,
            mark : false,
        },
        [DomainNotificationType.TOKENS_UPDATE]                  : {
            sound: false,
            mark : false,
        },
        [DomainNotificationType.USER_MESSAGE_IN]                : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.USER_MESSAGE_OUT]               : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.USER_MESSAGE_DELETED_IN]        : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.USER_MESSAGE_DELETED_OUT]       : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.USER_MESSAGE_REDACTED_IN]       : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.USER_MESSAGE_REDACTED_OUT]      : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.USER_MESSAGE_READ_IN]           : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.USER_MESSAGE_READ_OUT]          : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_REQUEST_IN]              : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_REQUEST_OUT]             : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_DELETED_IN]              : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_DELETED_OUT]             : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN]     : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_REQUEST_CANCELED_IN]     : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_IN]             : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_OUT]            : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_DELETED_IN]     : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_DELETED_OUT]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_IN]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_OUT]   : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_READ_IN]        : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_READ_OUT]       : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_IN]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT]   : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_CREATED_IN]            : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_CREATED_OUT]           : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_UPDATED_IN]            : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_UPDATED_OUT]           : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_DELETED_IN]            : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_DELETED_OUT]           : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_ARCHIVED_IN]           : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.DIALOGUE_ARCHIVED_OUT]          : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_IN]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_OUT]   : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_IN]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_OUT]   : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_IN]    : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_OUT]   : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_IN]  : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_OUT] : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_IN]   : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_OUT]  : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_IN] : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_OUT]: {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.POST_CREATED_IN]                : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.POST_CREATED_OUT]               : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.POST_DELETED_IN]                : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.POST_DELETED_OUT]               : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.POST_UPDATED_IN]                : {
            sound: true,
            mark : true,
        },
        [DomainNotificationType.POST_UPDATED_OUT]               : {
            sound: true,
            mark : true,
        },
    },
    isPending    : false,
    error        : null,
};

export const notificationsSlice = createSlice({
    name         : 'notifications',
    initialState : initialState,
    reducers     : {
        addNotification (state, action: PayloadAction<DomainNotification>) {
            if (state.notifications.every((notification) => notification.id !== action.payload.id)) {
                state.notifications.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            state.notifications = [];
            state.settings      = null;
            state.error         = null;
            state.isPending     = false;
        });
    },
});

export const {
                 actions: notificationsActions,
                 reducer: notificationsReducer,
             } = notificationsSlice;