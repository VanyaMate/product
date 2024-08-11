import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationFriendRequestAcceptedData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestAcceptedData';


export const acceptFriendRequestAction = (requestId: string) =>
    request(
        `v1/friend/accept/${ requestId }`,
        { method: 'POST' },
        isDomainNotificationFriendRequestAcceptedData,
    );