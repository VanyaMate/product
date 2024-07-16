import {
    createXhrWithInterceptors,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';
import {
    addBaseUrlXhrInterceptor,
} from '@/app/lib/api/xhr/interceptors/request/add-base-url-xhr.interceptor.ts';
import {
    addJsonContentTypeXhrInterceptor,
} from '@/app/lib/api/xhr/interceptors/request/add-json-content-type-xhr.interceptor.ts';
import {
    addUserTokensXhrInterceptor,
} from '@/app/lib/api/xhr/interceptors/request/add-user-tokens-xhr.interceptor.ts';
import {
    responseTokenRefreshXhrInterceptor,
} from '@/app/lib/api/xhr/interceptors/response/response-token-refresh-xhr.interceptor.ts';


export const apiXhr = createXhrWithInterceptors(
    [
        addBaseUrlXhrInterceptor(`${ __API__ }/`),
        addJsonContentTypeXhrInterceptor,
        addUserTokensXhrInterceptor,
    ],
    [
        responseTokenRefreshXhrInterceptor,
    ],
);