import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import { isDomainComment } from 'product-types/dist/comment/DomainComment';


export const replyOnPostCommentAction = function (postId: string, replyId: string, createData: DomainCommentCreateData) {
    console.log('Reply on', postId, replyId, createData);
    return request(
        `v1/post-comment/reply/${ postId }/${ replyId }`,
        {
            method: 'POST',
            body  : JSON.stringify(createData),
        },
        isDomainComment,
    );
};