import { isDomainResponse } from 'product-types/dist/response/DomainResponse';
import { isDomainTokens } from 'product-types/dist/token/DomainTokens';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/model/auth/const';
import {
    isDomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';
import { ResponseInterceptor } from '@vanyamate/fetch-with-interceptors';


export const responseTokenRefreshedInterceptor: ResponseInterceptor = async (response) => {
    const responsePayload: unknown = await response.clone().json();
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

    return response;
};