import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageDeletedData';


export const removePrivateMessageAction = (messageId: string) =>
    request(
        `v1/private-message/${ messageId }`,
        { method: 'DELETE' },
        isDomainNotificationPrivateMessageDeletedData,
    );