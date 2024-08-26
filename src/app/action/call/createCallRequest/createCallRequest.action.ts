import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationCallStartData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallStartData';


export const createCallRequestAction = function (userId: string) {
    return request(
        `v1/call/${ userId }`,
        { method: 'POST' },
        isDomainNotificationCallStartData,
    );
};