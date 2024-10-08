import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationFriendRequestCanceledData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestCanceledData';


export const cancelFriendRequestAction = (requestId: string) =>
    request(
        `v1/friend/cancel/${ requestId }`,
        { method: 'DELETE' },
        isDomainNotificationFriendRequestCanceledData,
    );