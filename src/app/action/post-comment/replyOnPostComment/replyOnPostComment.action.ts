import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import { isDomainComment } from 'product-types/dist/comment/DomainComment';


export const replyOnPostCommentAction = function (postId: string, commentsTree: Array<string>, createData: DomainCommentCreateData) {
    const replyCommentId = commentsTree[commentsTree.length - 1];
    return request(
        `v1/post-comment/reply/${ postId }/${ replyCommentId }`,
        {
            method: 'POST',
            body  : JSON.stringify(createData),
        },
        isDomainComment,
    );
};