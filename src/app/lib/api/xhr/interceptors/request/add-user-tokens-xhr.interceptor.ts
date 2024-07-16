import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/model/auth/const.ts';
import {
    RequestXhrInterceptor,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';


export const addUserTokensXhrInterceptor: RequestXhrInterceptor = async (url, params) => {
    const accessToken: string | undefined  = localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
    const refreshToken: string | undefined = localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN);

    if (!params.headers) {
        params.headers = {};
    }

    if (accessToken) {
        params.headers.authorization = accessToken;
    }
    if (refreshToken) {
        params.headers['refresh-token'] = refreshToken;
    }

    return [ url, params ];
};