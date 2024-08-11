import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationUserLoginUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserLoginUpdateData';


export const userLoginUpdateAction = function (login: string) {
    return request(
        `v1/user/login`,
        { method: 'PATCH', body: JSON.stringify({ login }) },
        isDomainNotificationUserLoginUpdateData,
    );
};