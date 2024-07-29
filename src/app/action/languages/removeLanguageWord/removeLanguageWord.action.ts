import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageWordDeletedData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageWordDeletedData';


export const removeLanguageWordAction = function (wordId: string) {
    return request(
        `v1/language/word/${ wordId }`,
        { method: 'DELETE' },
        isDomainNotificationLanguageWordDeletedData,
    );
};