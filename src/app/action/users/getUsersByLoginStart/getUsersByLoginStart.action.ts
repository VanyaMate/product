import {
    DomainSearchItemOptions,
} from 'product-types/search/DomainSearchItemOptions.ts';
import { request } from '@/app/lib/fetch/request.ts';
import { getSearchParams } from '@/app/lib/search-params/getSearchParams.ts';
import { isDomainSearchItem } from 'product-types/dist/search/DomainSearchItem';


export const getUsersByLoginStartAction = (options: DomainSearchItemOptions) =>
    request(
        `v1/search/users/?${ getSearchParams(options) }`,
        { method: 'GET' },
        isDomainSearchItem,
    );