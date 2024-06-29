import {
    DomainLoginData,
} from 'product-types/dist/authorization/DomainLoginData';
import { request } from '@/app/lib/fetch/request.ts';
import { isDomainUser } from 'product-types/dist/user/DomainUser';


export const loginAction = (loginData: DomainLoginData) =>
    request(
        `authentication/login`,
        {
            method: 'POST',
            body  : JSON.stringify(loginData),
        },
        isDomainUser,
    );