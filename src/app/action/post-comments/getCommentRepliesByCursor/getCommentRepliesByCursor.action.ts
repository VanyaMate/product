import { request } from '@/app/lib/fetch/request.ts';
import { isArray } from 'product-types/dist/_helpers/lib/isArray';
import {
    DomainComment,
    isDomainComment,
} from 'product-types/dist/comment/DomainComment';


export const getCommentRepliesByCursorAction = function (commentId: string, cursor: string, take: number = 3): Promise<Array<DomainComment>> {
    return request<Array<DomainComment>>(
        `v1/post-comments/comment/replies/${ commentId }/${ cursor }?take=${ take }}`,
        {
            method: 'GET',
        },
        (data): data is Array<DomainComment> => isArray(data, isDomainComment),
    );
};