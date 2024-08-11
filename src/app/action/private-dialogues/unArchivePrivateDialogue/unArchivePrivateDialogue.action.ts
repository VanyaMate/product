import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPrivateDialogueArchiveData
} from 'product-types/dist/notification/notification-data-types/private-dialogue/DomainNotificationPrivateDialogueArchiveData';


export const unArchivePrivateDialogueAction = (dialogueId: string) =>
    request(
        `v1/private-dialogue/un-archive/${ dialogueId }`,
        { method: 'POST' },
        isDomainNotificationPrivateDialogueArchiveData,
    );