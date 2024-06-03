import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    friendsActions,
    friendsReducer,
} from '@/app/redux/slices/friends/slice/friends.slice.ts';
import { useEffect } from 'react';
import {
    getFriendsWithRequestsForUser,
} from '@/app/redux/slices/friends/thunks/getFriendsWithRequestsForUser/getFriendsWithRequestsForUser.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    isDomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    isDomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';
import {
    isDomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';
import {
    isDomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';


export const useFriendsUpdater = function () {
    const notification = useNotification('friends');
    const dispatch     = useAppDispatch();
    const friends      = useAppSelector((state) => state.friends);

    useReducerConnector('friends', friendsReducer);

    useEffect(() => {
        dispatch(getFriendsWithRequestsForUser());
    }, [ dispatch ]);

    useEffect(() => {
        if (friends) {
            const onFriendRequestIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendRequestData(notification.data)) {
                        dispatch(friendsActions.addFriendRequestOut(notification.data));
                    }
                });
            };

            const onFriendRequestOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendRequestData(notification.data)) {
                        dispatch(friendsActions.addFriendRequestIn(notification.data));
                    }
                });
            };

            const onFriendRequestCanceledIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendRequestCanceledData(notification.data)) {
                        dispatch(friendsActions.removeFriendRequestIn(notification.data.requestId));
                        dispatch(friendsActions.removeFriendRequestOut(notification.data.requestId));
                    }
                });
            };

            const onFriendRequestCanceledOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendRequestCanceledData(notification.data)) {
                        dispatch(friendsActions.removeFriendRequestIn(notification.data.requestId));
                        dispatch(friendsActions.removeFriendRequestOut(notification.data.requestId));
                    }
                });
            };

            const onFriendRequestAcceptedIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendRequestAcceptedData(notification.data)) {
                        dispatch(friendsActions.addFriend(notification.data.user));
                        dispatch(friendsActions.removeFriendRequestIn(notification.data.requestId));
                        dispatch(friendsActions.removeFriendRequestOut(notification.data.requestId));
                    }
                });
            };

            const onFriendRequestAcceptedOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendRequestAcceptedData(notification.data)) {
                        dispatch(friendsActions.addFriend(notification.data.user));
                        dispatch(friendsActions.removeFriendRequestIn(notification.data.requestId));
                        dispatch(friendsActions.removeFriendRequestOut(notification.data.requestId));
                    }
                });
            };

            const onFriendDeletedIn: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendDeletedData(notification.data)) {
                        dispatch(friendsActions.removeFriend(notification.data.user.id));
                    }
                });
            };

            const onFriendDeletedOut: NotificationNotificatorCallback = (notifications) => {
                notifications.forEach((notification) => {
                    if (isDomainNotificationFriendDeletedData(notification.data)) {
                        dispatch(friendsActions.removeFriend(notification.data.user.id));
                    }
                });
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
    }, [ dispatch, friends, notification ]);
};