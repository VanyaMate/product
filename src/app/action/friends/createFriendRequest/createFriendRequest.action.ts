import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationFriendRequestData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestData';


export const createFriendRequestAction = (userId: string) =>
    request(
        `v1/friend/${ userId }`,
        { method: 'POST' },
        isDomainNotificationFriendRequestData,
    );