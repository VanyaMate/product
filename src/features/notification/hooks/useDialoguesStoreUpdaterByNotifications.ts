import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    privateDialoguesReducer,
} from '@/app/redux/slices/private-dialogues/slice/private-dialogues.slice.ts';
import { useEffect } from 'react';
import {
    getListPrivateDialogues,
} from '@/app/redux/slices/private-dialogues/thunks/getListPrivateDialogues/getListPrivateDialogues.ts';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    isDomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageData';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    sendPrivateMessageNotification,
} from '@/app/redux/slices/private-messages/thunks/sendPrivateMessageNotification.ts';
import {
    privateMessagesReducer,
} from '@/app/redux/slices/private-messages/slice/privateMessages.slice.ts';
import {
    privateMessagesSearchReducer,
} from '@/app/redux/slices/private-messages-search/slice/private-messages-search.slice.ts';


export const useDialoguesStoreUpdaterByNotifications = function () {
    const notification = useNotification('dialogues-store-updater');
    const dispatch     = useAppDispatch();
    const dialogues    = useAppSelector((state) => state.dialogues);

    useReducerConnector('dialogues', privateDialoguesReducer);
    useReducerConnector('privateMessages', privateMessagesReducer);
    useReducerConnector('privateMessagesSearch', privateMessagesSearchReducer);

    useEffect(() => {
        dispatch(getListPrivateDialogues({
            offset: 0,
            limit : 1000,
            query : '',
        }));
    }, [ dispatch ]);

    useEffect(() => {
        if (dialogues) {
            const onPrivateMessageIn: NotificationNotificatorCallback = function (notifications) {
                notifications.forEach((notification) => {
                    if (isDomainNotificationPrivateMessageData(notification.data)) {
                        dispatch(sendPrivateMessageNotification(notification.data));
                    }
                });
            };

            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_IN, onPrivateMessageIn);
            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_OUT, onPrivateMessageIn);

            return () => {
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_IN, onPrivateMessageIn);
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_OUT, onPrivateMessageIn);
            };
        }
    }, [ dialogues, dispatch, notification ]);
};