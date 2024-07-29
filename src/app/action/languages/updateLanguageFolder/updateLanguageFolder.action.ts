import {
    DomainLanguageFolderUpdateData,
} from 'product-types/dist/language/DomainLanguageFolderUpdateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageFolderUpdateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageFolderUpdateData';


export const updateLanguageFolderAction = function (folderId: string, updateData: DomainLanguageFolderUpdateData) {
    return request(
        `v1/language/folder/${ folderId }`,
        { method: 'PATCH', body: JSON.stringify(updateData) },
        isDomainNotificationLanguageFolderUpdateData,
    );
};