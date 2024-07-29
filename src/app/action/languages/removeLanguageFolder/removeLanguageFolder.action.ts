import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageFolderDeletedData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageFolderDeletedData';


export const removeLanguageFolderAction = function (folderId: string) {
    return request(
        `v1/language/folder/${ folderId }`,
        { method: 'DELETE' },
        isDomainNotificationLanguageFolderDeletedData,
    );
};