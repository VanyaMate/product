import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateDialogueArchiveData
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueArchiveData';


export const archivePrivateDialogueAction = (dialogueId: string) =>
    request(
        `v1/private-dialogue/archive/${ dialogueId }`,
        { method: 'POST' },
        isDomainNotificationPrivateDialogueArchiveData,
    );