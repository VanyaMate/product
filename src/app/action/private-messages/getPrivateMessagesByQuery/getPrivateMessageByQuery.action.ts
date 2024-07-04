import { request } from '@/app/lib/fetch/request.ts';
import { getSearchParams } from '@/app/lib/search-params/getSearchParams.ts';
import { isDomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';


export const getPrivateMessageByQueryAction = ([ dialogueId, options ]: [ string, DomainSearchItemOptions ]) =>
    request(
        `v1/private-messages/${ dialogueId }?${ getSearchParams(options) }`,
        { method: 'GET' },
        isDomainSearchItem,
    );