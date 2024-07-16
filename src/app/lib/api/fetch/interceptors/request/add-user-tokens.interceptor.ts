import { RequestInterceptor } from '@vanyamate/fetch-with-interceptors';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/model/auth/const.ts';


export const addUserTokensInterceptor: RequestInterceptor = async (data, init) => {
    const accessToken: string | undefined  = localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
    const refreshToken: string | undefined = localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN);
    init.headers                           = new Headers(init.headers);

    if (accessToken) {
        init.headers.set('authorization', accessToken);
    }
    if (refreshToken) {
        init.headers.set('refresh-token', refreshToken);
    }

    return [ data, init ];
};