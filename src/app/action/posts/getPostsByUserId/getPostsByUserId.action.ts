import {
    DomainSearchItemOptions,
} from 'product-types/search/DomainSearchItemOptions.ts';
import { getSearchParams } from '@/app/lib/search-params/getSearchParams.ts';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainSearchItem,
} from 'product-types/dist/search/DomainSearchItem';


export const getPostsByUserIdAction = (userId: string, options?: Partial<DomainSearchItemOptions>) =>
    request(
        `v1/posts/user/${ userId }?${ getSearchParams(options) }`,
        { method: 'GET' },
        isDomainSearchItem,
    );