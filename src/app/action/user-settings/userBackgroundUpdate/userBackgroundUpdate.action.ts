import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationUserBackgroundUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserBackgroundUpdateData';


export const userBackgroundUpdateAction = function (background: string) {
    return request(
        `v1/user/background`,
        { method: 'PATCH', body: JSON.stringify({ background }) },
        isDomainNotificationUserBackgroundUpdateData,
    );
};