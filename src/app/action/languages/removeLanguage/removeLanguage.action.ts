import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageDeletedData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageDeletedData';


export const removeLanguageAction = function (languageId: string) {
    return request(
        `v1/language/${ languageId }`,
        { method: 'DELETE' },
        isDomainNotificationLanguageDeletedData,
    );
};