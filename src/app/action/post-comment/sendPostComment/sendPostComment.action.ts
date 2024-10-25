import { request } from '@/app/lib/fetch/request.ts';
import { isDomainComment } from 'product-types/dist/comment/DomainComment';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';


export const sendPostCommentAction = function (postId: string, createData: DomainCommentCreateData) {
    return request(
        `v1/post-comment/${ postId }`,
        {
            method: 'POST',
            body  : JSON.stringify(createData),
        },
        isDomainComment,
    );
};