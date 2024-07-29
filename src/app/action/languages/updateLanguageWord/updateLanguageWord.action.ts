import {
    DomainLanguageWordUpdateData,
} from 'product-types/dist/language/DomainLanguageWordUpdateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageWordUpdateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageWordUpdateData';


export const updateLanguageWordAction = function (wordId: string, updateData: DomainLanguageWordUpdateData) {
    return request(
        `v1/language/word/${ wordId }`,
        { method: 'PATCH', body: JSON.stringify(updateData) },
        isDomainNotificationLanguageWordUpdateData,
    );
};