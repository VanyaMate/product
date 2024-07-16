import {
    addUserTokensInterceptor,
} from '@/app/lib/api/fetch/interceptors/request/add-user-tokens.interceptor.ts';
import {
    addBaseUrlInterceptor,
} from '@/app/lib/api/fetch/interceptors/request/add-base-url.interceptor.ts';
import {
    addJsonContentTypeInterceptor,
} from '@/app/lib/api/fetch/interceptors/request/add-json-content-type.interceptor.ts';
import {
    responseTokenRefreshedInterceptor,
} from '@/app/lib/api/fetch/interceptors/response/refresh-user-tokens.interceptor.ts';
import {
    createFetchWithInterceptors,
} from '@vanyamate/fetch-with-interceptors';


export const apiFetch = createFetchWithInterceptors([
    addBaseUrlInterceptor(`${ __API__ }/`),
    addJsonContentTypeInterceptor,
    addUserTokensInterceptor,
], [
    responseTokenRefreshedInterceptor,
]);