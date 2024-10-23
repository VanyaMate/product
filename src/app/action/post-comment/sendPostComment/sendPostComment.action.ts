import { request } from '@/app/lib/fetch/request.ts';
import { isDomainComment } from 'product-types/dist/comment/DomainComment';


export const sendPostCommentAction = function (postId: string, comment: string) {
    return request(
        `v1/post-comment/${ postId }`,
        {
            method: 'POST',
            body  : JSON.stringify({ comment }),
        },
        isDomainComment,
    );
};