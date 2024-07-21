import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import { useLayoutEffect } from 'react';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateDialogues,
    getListPrivateDialogueEffect,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import {
    readAllPrivateMessagesNotificationInEffect,
    readAllPrivateMessagesNotificationOutEffect,
    readPrivateMessageNotificationEffect,
    sendPrivateMessageNotificationEffect,
} from '@/app/model/private-messages/private-messages.model.ts';


export const useDialoguesStoreUpdaterByNotifications = function () {
    const notification = useNotification('dialogues-store-updater');
    const dialogues    = useStore($privateDialogues);

    useLayoutEffect(() => {
        getListPrivateDialogueEffect({ limit: 1000, query: '', offset: 0 });
    }, []);

    useLayoutEffect(() => {
        if (dialogues) {
            const applyEffect = function (callback: (data: unknown) => void): NotificationNotificatorCallback {
                return (notifications: DomainNotification[]) => {
                    notifications.forEach(({ data }) => callback(data));
                };
            };

            const onPrivateMessageIn   = applyEffect(sendPrivateMessageNotificationEffect);
            const onReadMessage        = applyEffect(readPrivateMessageNotificationEffect);
            const onReadAllInMessages  = applyEffect(readAllPrivateMessagesNotificationInEffect);
            const onReadAllOutMessages = applyEffect(readAllPrivateMessagesNotificationOutEffect);

            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_IN, onPrivateMessageIn);
            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_OUT, onPrivateMessageIn);
            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_IN, onReadMessage);
            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_OUT, onReadMessage);
            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_IN, onReadAllInMessages);
            notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT, onReadAllOutMessages);

            return () => {
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_IN, onPrivateMessageIn);
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_OUT, onPrivateMessageIn);
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_IN, onReadMessage);
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_OUT, onReadMessage);
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_IN, onReadAllInMessages);
                notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT, onReadAllOutMessages);
            };
        }
    }, [ dialogues, notification ]);
};