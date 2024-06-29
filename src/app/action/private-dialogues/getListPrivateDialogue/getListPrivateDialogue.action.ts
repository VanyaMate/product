import {
    DomainSearchItemOptions,
} from 'product-types/dist/search/DomainSearchItemOptions';
import { request } from '@/app/lib/fetch/request.ts';
import { getSearchParams } from '@/app/lib/search-params/getSearchParams.ts';
import {
    DomainPrivateDialogueFull,
    isDomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';


export const getListPrivateDialogueAction = (options: DomainSearchItemOptions) =>
    request(
        `v1/private-dialogues/list/?${ getSearchParams(options) }`,
        { method: 'GET' },
        (data): data is Array<DomainPrivateDialogueFull> => Array.isArray(data) && data.every(isDomainPrivateDialogueFull),
    );