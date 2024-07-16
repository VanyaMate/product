import {
    RequestXhrInterceptor,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';


export const addBaseUrlXhrInterceptor = (baseUrl: string): RequestXhrInterceptor => async function (url, params) {
    return [ baseUrl + url, params ];
};