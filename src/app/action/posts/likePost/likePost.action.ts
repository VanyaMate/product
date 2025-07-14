import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationPostLikedData,
} from 'product-types/dist/notification/notification-data-types/post/DomainNotificationPostLikedData';


export const likePostAction = async function (postId: string) {
    return request(
        `v1/post-like/${ postId }`,
        {
            method: 'POST',
        },
        isDomainNotificationPostLikedData,
    );
};