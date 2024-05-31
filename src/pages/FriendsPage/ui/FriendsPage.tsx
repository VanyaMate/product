import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import {
    friendsActions,
    friendsReducer,
} from '@/app/redux/slices/friends/slice/friends.slice.ts';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    getFriendsWithRequestsForUser,
} from '@/app/redux/slices/friends/thunks/getFriendsWithRequestsForUser.ts';
import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    isDomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
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
    FriendsDetails,
} from '@/widgets/friends/details/FriendsDetails/ui/FriendsDetails.tsx';
import {
    FriendRequestsOutDetails,
} from '@/widgets/friends/details/FriendRequestsOutDetails/ui/FriendRequestsOutDetails.tsx';
import {
    FriendRequestsInDetails,
} from '@/widgets/friends/details/FriendRequestsInDetails/ui/FriendRequestsInDetails.tsx';


export type FriendsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FriendsPage: FC<FriendsPageProps> = memo(function FriendsPage (props) {
    const { className, ...other } = props;
    const friends                 = useAppSelector((state) => state.friends);
    const dispatch                = useAppDispatch();
    const notification            = useNotification('friends-page');

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

    if (!friends) {
        return <PageLoader/>;
    }

    return (
        <div
            { ...other }
            className={ className }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>pending: { friends.isPending.toString() }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>error: { friends.error?.toString() }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>friends: { friends.friends.length }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>requestsIn: { friends.requestsIn.length }</p>
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            <p>requestsOut: { friends.requestsOut.length }</p>

            <FriendRequestsInDetails/>
            <FriendRequestsOutDetails/>
            <FriendsDetails/>
        </div>
    );
});