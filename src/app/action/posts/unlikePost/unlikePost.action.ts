import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPostUnlikedData,
} from 'product-types/dist/notification/notification-data-types/post/DomainNotificationPostUnlikedData';


export const unlikePostAction = async function (postId: string) {
    return request(
        `v1/post-like/${ postId }`,
        {
            method: 'DELETE',
        },
        isDomainNotificationPostUnlikedData,
    );
};