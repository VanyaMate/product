import {
    DomainLanguageFolderCreateData,
} from 'product-types/dist/language/DomainLanguageFolderCreateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageFolderCreateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageFolderCreateData';


export const createLanguageFolderAction = function (languageId: string, createData: DomainLanguageFolderCreateData) {
    return request(
        `v1/language/folder/${ languageId }`,
        { method: 'POST', body: JSON.stringify(createData), isJson: true },
        isDomainNotificationLanguageFolderCreateData,
    );
};