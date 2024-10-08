import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationFriendDeletedData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendDeletedData';


export const removeFriendAction = (userId: string) =>
    request(
        `v1/friend/remove/${ userId }`,
        { method: 'DELETE' },
        isDomainNotificationFriendDeletedData,
    );