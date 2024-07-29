import {
    DomainLanguageUpdateData,
} from 'product-types/dist/language/DomainLanguageUpdateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageUpdateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageUpdateData';


export const updateLanguageAction = function (languageId: string, updateData: DomainLanguageUpdateData) {
    return request(
        `v1/language/${ languageId }`,
        { method: 'PATCH', body: JSON.stringify(updateData) },
        isDomainNotificationLanguageUpdateData,
    );
};