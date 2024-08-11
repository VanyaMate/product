import {
    DomainMessageUpdateData,
} from 'product-types/dist/message/DomainMessageUpdateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateMessageData
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageData';


export const updatePrivateMessageAction = ([ messageId, updateData ]: [ string, DomainMessageUpdateData ]) =>
    request(
        `v1/private-message/${ messageId }`,
        { method: 'POST', body: JSON.stringify(updateData) },
        isDomainNotificationPrivateMessageData,
    );