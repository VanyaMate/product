import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import { useEffect } from 'react';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    isDomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageData';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { useStore } from '@vanyamate/sec-react';
import {
    getListPrivateDialogueEffect,
    $privateDialogues,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';


export const useDialoguesStoreUpdaterByNotifications = function () {
    const notification = useNotification('dialogues-store-updater');
    const dialogues    = useStore($privateDialogues);

    useEffect(() => {
        getListPrivateDialogueEffect({ limit: 1000, query: '', offset: 0 });
    }, []);

    useEffect(() => {
        if (dialogues) {
            const onPrivateMessageIn: NotificationNotificatorCallback = function (notifications) {
                notifications.forEach((notification) => {
                    if (isDomainNotificationPrivateMessageData(notification.data)) {
                        // dispatch(sendPrivateMessageNotification(notification.data));
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
    }, [ dialogues, notification ]);
};