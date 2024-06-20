import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';


export const receivedFriendRequestNotification = createNotificationAction<DomainNotificationFriendRequestData>('friends/receivedFriendRequestNotification');