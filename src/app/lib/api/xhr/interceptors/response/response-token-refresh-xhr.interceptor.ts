import { isDomainResponse } from 'product-types/dist/response/DomainResponse';
import { isDomainTokens } from 'product-types/dist/token/DomainTokens';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/model/auth/const.ts';
import {
    isDomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';
import {
    ResponseXhrInterceptor,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';
import { jsonParse } from '@/shared/lib/json/json-parse.ts';


export const responseTokenRefreshXhrInterceptor: ResponseXhrInterceptor = async (xhr) => {
    const responsePayload: unknown = jsonParse(xhr.response);

    if (responsePayload) {
        if (isDomainResponse(responsePayload)) {
            if (isDomainTokens(responsePayload.tokens)) {
                localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, responsePayload.tokens[0]);
                localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, responsePayload.tokens[1]);
            } else if (isDomainAuthResponse(responsePayload.data)) {
                localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, responsePayload.data.tokens[0]);
                localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, responsePayload.data.tokens[1]);
            }
        }
    }

    return xhr;
};