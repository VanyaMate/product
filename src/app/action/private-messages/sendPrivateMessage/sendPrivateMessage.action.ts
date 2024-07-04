import {
    DomainMessageCreateData,
} from 'product-types/dist/message/DomainMessageCreateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageData';


export const sendPrivateMessageAction = ([ dialogueId, messageData ]: [ string, DomainMessageCreateData ]) =>
    request(
        `v1/private-message/${ dialogueId }`,
        { method: 'POST', body: JSON.stringify(messageData) },
        isDomainNotificationPrivateMessageData,
    );