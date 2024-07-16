// TODO: Continue
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationFileUploadedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFileUploadedData';


export const uploadFileAction = async (file: File, onProgressCallback?: (progress: number) => void) => {
    const data = new FormData();
    data.append('file', file, file.name);

    return request(
        `v1/file`,
        {
            method          : 'POST',
            isJson          : false,
            body            : data,
            onUploadProgress: onProgressCallback,
        },
        isDomainNotificationFileUploadedData,
    );
};