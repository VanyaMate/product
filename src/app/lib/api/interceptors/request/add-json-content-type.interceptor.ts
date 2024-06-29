import {
    RequestInterceptor,
} from '@/app/lib/fetch/createFetchWithInterceptors.ts';


export const addJsonContentTypeInterceptor: RequestInterceptor = async function (url, init) {
    init.headers = new Headers(init.headers);
    init.headers.set('Content-Type', 'application/json');

    return [ url, init ];
};