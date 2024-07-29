import {
    DomainLanguageWordCreateData,
} from 'product-types/dist/language/DomainLanguageWordCreateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageWordCreateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageWordCreateData';


export const createLanguageWordAction = function (folderId: string, createData: DomainLanguageWordCreateData) {
    return request(
        `v1/language/word/${ folderId }`,
        { method: 'POST', isJson: true, body: JSON.stringify(createData) },
        isDomainNotificationLanguageWordCreateData,
    );
};