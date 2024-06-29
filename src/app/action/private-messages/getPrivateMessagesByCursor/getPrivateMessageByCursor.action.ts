import {
    DomainSearchCursorOptions,
} from 'product-types/dist/search/DomainSearchCursorOptions';
import { request } from '@/app/lib/fetch/request.ts';
import { getSearchParams } from '@/app/lib/search-params/getSearchParams.ts';
import { isDomainSearchItem } from 'product-types/dist/search/DomainSearchItem';


export const getPrivateMessageByCursorAction = ([ dialogueId, options ]: [ string, DomainSearchCursorOptions ]) =>
    request(
        `v1/private-messages/cursor/${ dialogueId }?${ getSearchParams(options) }`,
        { method: 'GET' },
        isDomainSearchItem,
    );