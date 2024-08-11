import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateDialogueCreateData
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueCreateData';


export const createPrivateDialogueAction = (userId: string) =>
    request(
        `v1/private-dialogue/${ userId }`,
        { method: 'POST' },
        isDomainNotificationPrivateDialogueCreateData,
    );