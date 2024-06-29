import {
    RequestInterceptor,
} from '@/app/lib/fetch/createFetchWithInterceptors.ts';


export const addBaseUrlInterceptor = (baseUrl: string): RequestInterceptor => async function (url, init) {
    return [ baseUrl + url, init ];
};