import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateMessageReadAllData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageReadAllData';


export const readAllPrivateMessageAction = (dialogueId: string) =>
    request(
        `v1/private-message/all/${ dialogueId }`,
        { method: 'GET' },
        isDomainNotificationPrivateMessageReadAllData,
    );