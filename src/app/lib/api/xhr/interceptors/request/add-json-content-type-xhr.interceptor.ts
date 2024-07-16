import {
    RequestXhrInterceptor,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';


export const addJsonContentTypeXhrInterceptor: RequestXhrInterceptor = async function (url, params) {
    if (!params.headers) {
        params.headers = {};
    }

    if (params.isJson === true || typeof params.isJson === 'undefined') {
        params.headers['Content-Type'] = 'application/json';
    }

    return [ url, params ];
};