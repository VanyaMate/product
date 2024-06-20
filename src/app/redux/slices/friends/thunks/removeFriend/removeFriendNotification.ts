import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';
import {
    DomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';


export const removeFriendNotification = createNotificationAction<DomainNotificationFriendDeletedData>('friends/removeFriendNotification');