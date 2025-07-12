import { request } from '@/app/lib/fetch/request.ts';
import { isDomainPost } from 'product-types/dist/post/DomainPost';


export const likePostAction = function (postId: string) {
    return request(
        `v1/post-like/${ postId }`,
        {
            method: 'POST',
        },
        isDomainPost,
    );
};