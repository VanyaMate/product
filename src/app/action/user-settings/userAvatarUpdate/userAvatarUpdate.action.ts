import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationUserAvatarUpdateData,
} from 'product-types/dist/notification/notification-data-types/user/DomainNotificationUserAvatarUpdateData';


export const userAvatarUpdateAction = function (avatar: string) {
    return request(
        `v1/user/avatar`,
        { method: 'PATCH', body: JSON.stringify({ avatar }) },
        isDomainNotificationUserAvatarUpdateData,
    );
};