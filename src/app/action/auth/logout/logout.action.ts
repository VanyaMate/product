import { request } from '@/app/lib/fetch/request.ts';
import { isDomainUser } from 'product-types/dist/user/DomainUser';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/model/auth/const.ts';


export const logoutAction = () => {
    return request(`v1/authentication/logout`, { method: 'POST' }, isDomainUser).finally(() => {
        localStorage.removeItem(LOCAL_STORAGE_USER_ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_USER_REFRESH_TOKEN);
    });
};