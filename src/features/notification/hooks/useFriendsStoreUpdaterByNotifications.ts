import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import { useEffect } from 'react';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { useStore } from '@vanyamate/sec-react';
import {
    $friendsList,
    acceptFriendRequestNotificationEffect,
    cancelFriendRequestNotificationEffect,
    createFriendRequestNotificationEffect,
    getMyFriendsEffect,
    receivedFriendRequestNotificationEffect,
    removeFriendNotificationEffect,
} from '@/app/model/friends/friends.model.ts';


export const useFriendsStoreUpdaterByNotifications = function () {
    const notification = useNotification(`friends-store-updater`);
    const friends      = useStore($friendsList);

    useEffect(() => {
        getMyFriendsEffect();
    }, []);

    useEffect(() => {
        if (friends) {
            const onFriendRequestIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => createFriendRequestNotificationEffect(data));
            };

            const onFriendRequestOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => receivedFriendRequestNotificationEffect(data));
            };

            const onFriendRequestCanceledIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => cancelFriendRequestNotificationEffect(data));
            };

            const onFriendRequestCanceledOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => cancelFriendRequestNotificationEffect(data));
            };

            const onFriendRequestAcceptedIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => acceptFriendRequestNotificationEffect(data));
            };

            const onFriendRequestAcceptedOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => acceptFriendRequestNotificationEffect(data));
            };

            const onFriendDeletedIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => removeFriendNotificationEffect(data));
            };

            const onFriendDeletedOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach(({ data }) => removeFriendNotificationEffect(data));
            };

            notification.subscribe(DomainNotificationType.FRIEND_REQUEST_IN, onFriendRequestIn);
            notification.subscribe(DomainNotificationType.FRIEND_REQUEST_OUT, onFriendRequestOut);
            notification.subscribe(DomainNotificationType.FRIEND_DELETED_IN, onFriendDeletedIn);
            notification.subscribe(DomainNotificationType.FRIEND_DELETED_OUT, onFriendDeletedOut);
            notification.subscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_IN, onFriendRequestCanceledIn);
            notification.subscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT, onFriendRequestCanceledOut);
            notification.subscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN, onFriendRequestAcceptedIn);
            notification.subscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT, onFriendRequestAcceptedOut);

            return () => {
                notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_IN, onFriendRequestIn);
                notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_OUT, onFriendRequestOut);
                notification.unsubscribe(DomainNotificationType.FRIEND_DELETED_IN, onFriendDeletedIn);
                notification.unsubscribe(DomainNotificationType.FRIEND_DELETED_OUT, onFriendDeletedOut);
                notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_IN, onFriendRequestCanceledIn);
                notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT, onFriendRequestCanceledOut);
                notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN, onFriendRequestAcceptedIn);
                notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT, onFriendRequestAcceptedOut);
            };
        }
    }, [ friends, notification ]);
};