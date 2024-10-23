import { request } from '@/app/lib/fetch/request.ts';
import { isDomainComment } from 'product-types/dist/comment/DomainComment';


export const likePostCommentAction = function (commentId: string) {
    return request(
        `v1/post-comment/like/${ commentId }`,
        {
            method: 'POST',
        },
        isDomainComment,
    );
};