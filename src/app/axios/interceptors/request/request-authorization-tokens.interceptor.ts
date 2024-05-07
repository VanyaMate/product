import { InternalAxiosRequestConfig } from 'axios';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';


export const requestAuthorizationTokensInterceptor = (request: InternalAxiosRequestConfig<any>) => {
    request.headers.authorization    = localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
    request.headers['refresh-token'] = localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN);
    return request;
};