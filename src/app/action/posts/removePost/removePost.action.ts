import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPostDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPostDeletedData';


export const removePostAction = (postId: string) =>
    request(
        `v1/post/${ postId }`,
        { method: 'DELETE' },
        isDomainNotificationPostDeletedData,
    );