import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';
import {
    DomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';


export const cancelFriendRequestNotification = createNotificationAction<DomainNotificationFriendRequestCanceledData>('friends/cancelFriendRequestNotification');