import { request } from '@/app/lib/fetch/request.ts';
import { isArray } from 'product-types/dist/_helpers/lib/isArray';
import {
    DomainComment,
    isDomainComment,
} from 'product-types/dist/comment/DomainComment';


export const getCommentRepliesAction = function (commentId: string, take: number = 3, skip: number = 0): Promise<Array<DomainComment>> {
    return request<Array<DomainComment>>(
        `v1/post-comments/replies/${ commentId }?take=${ take }&skip=${ skip }`,
        {
            method: 'GET',
        },
        (data): data is Array<DomainComment> => isArray(data, isDomainComment),
    );
};