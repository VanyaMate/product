import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';


export const userPasswordUpdateAction = function (password: string) {
    return request(
        `v1/user/password`,
        { method: 'PATCH', body: JSON.stringify({ password }) },
        isDomainAuthResponse,
    );
};