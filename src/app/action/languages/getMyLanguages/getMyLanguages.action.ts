import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainLanguageWithFolders,
    isDomainLanguageWithFolders,
} from 'product-types/dist/language/DomainLanguageWithFolders';


export const getMyLanguagesAction = function () {
    return request(
        `v1/languages`,
        { method: 'GET' },
        (data: unknown): data is Array<DomainLanguageWithFolders> => {
            return Array.isArray(data) && data.every(isDomainLanguageWithFolders);
        },
    );
};