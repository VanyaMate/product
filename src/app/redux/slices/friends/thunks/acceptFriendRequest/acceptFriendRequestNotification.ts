import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';
import {
    DomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';


export const acceptFriendRequestNotification = createNotificationAction<DomainNotificationFriendRequestAcceptedData>('friends/acceptFriendRequestNotification');