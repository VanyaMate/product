import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainLanguageWord, isDomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';


export const getMyLanguageFolderWordsAction = function (folderId: string) {
    return request(
        `v1/languages/folder/${ folderId }`,
        { method: 'GET' },
        (data: unknown): data is Array<DomainLanguageWord> => {
            return Array.isArray(data) && data.every(isDomainLanguageWord);
        },
    );
};