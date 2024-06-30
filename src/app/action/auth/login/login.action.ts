import {
    DomainLoginData,
} from 'product-types/dist/authorization/DomainLoginData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';


export const loginAction = (loginData: DomainLoginData) =>
    request(
        `v1/authentication/login`,
        {
            method: 'POST',
            body  : JSON.stringify(loginData),
        },
        isDomainAuthResponse,
    );