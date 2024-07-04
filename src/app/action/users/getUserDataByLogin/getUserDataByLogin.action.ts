import { request } from '@/app/lib/fetch/request.ts';
import { isDomainUserFull } from 'product-types/dist/user/DomainUserFull';


export const getUserDataByLoginAction = (login: string) =>
    request(
        `v1/users/full/${ login }`,
        { method: 'GET' },
        isDomainUserFull
    );