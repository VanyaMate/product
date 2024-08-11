import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateDialogueDeletedData
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueDeletedData';


export const removePrivateDialogueAction = (dialogueId: string) =>
    request(
        `v1/private-dialogue/${ dialogueId }`,
        { method: 'DELETE' },
        isDomainNotificationPrivateDialogueDeletedData,
    );