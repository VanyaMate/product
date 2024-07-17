import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationFileDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFileDeletedData';


export const removeFileAction = (fileId: string) =>
    request(
        `v1/file/${ fileId }`,
        { method: 'DELETE' },
        isDomainNotificationFileDeletedData,
    );