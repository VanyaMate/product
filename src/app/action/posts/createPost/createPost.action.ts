import { request } from '@/app/lib/fetch/request.ts';
import { isDomainPost } from 'product-types/dist/post/DomainPost';
import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';


export const createPostAction = (createData: DomainPostCreateData) =>
    request(
        `v1/post`,
        { method: 'POST', body: JSON.stringify(createData) },
        isDomainPost,
    );