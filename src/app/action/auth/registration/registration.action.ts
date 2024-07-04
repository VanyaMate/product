import {
    DomainRegistrationData,
} from 'product-types/dist/authorization/DomainRegistrationData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainAuthResponse,
} from 'product-types/dist/authorization/DomainAuthResponse';


export const registrationAction = (registrationData: DomainRegistrationData) =>
    request(
        `v1/authentication/registration`,
        {
            method: 'POST',
            body  : JSON.stringify(registrationData),
        },
        isDomainAuthResponse,
    );