import { isDomainResponse } from 'product-types/dist/response/DomainResponse';
import { isDomainTokens } from 'product-types/dist/token/DomainTokens';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';
import { AxiosResponse } from 'axios';


export const responseTokenRefreshedInterceptor = (response: AxiosResponse<any, any>) => {
    if (isDomainResponse(response.data)) {
        if (isDomainTokens(response.data.tokens)) {
            localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, response.data.tokens[0]);
            localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, response.data.tokens[1]);
        }
    }

    return response;
};