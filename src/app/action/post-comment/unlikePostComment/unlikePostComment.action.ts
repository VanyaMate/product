import { request } from '@/app/lib/fetch/request.ts';
import { isDomainComment } from 'product-types/dist/comment/DomainComment';


export const unlikePostCommentAction = function (commentId: string) {
    return request(
        `v1/post-comment/unlike/${ commentId }`,
        {
            method: 'POST',
        },
        isDomainComment,
    );
};