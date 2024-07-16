import { RequestInterceptor } from '@vanyamate/fetch-with-interceptors';


export const addBaseUrlInterceptor = (baseUrl: string): RequestInterceptor => async function (url, init) {
    return [ baseUrl + url, init ];
};