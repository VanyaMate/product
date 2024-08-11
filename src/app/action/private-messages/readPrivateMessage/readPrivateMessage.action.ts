import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateMessageReadData
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageReadData';


export const readPrivateMessageAction = (messageId: string) =>
    request(
        `v1/private-message/${ messageId }`,
        { method: 'GET' },
        isDomainNotificationPrivateMessageReadData,
    );