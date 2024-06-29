import {
    DomainRegistrationData,
} from 'product-types/dist/authorization/DomainRegistrationData';
import { request } from '@/app/lib/fetch/request.ts';
import { isDomainUser } from 'product-types/dist/user/DomainUser';


export const registrationAction = (registrationData: DomainRegistrationData) =>
    request(
        `authentication/registration`,
        {
            method: 'POST',
            body  : JSON.stringify(registrationData),
        },
        isDomainUser,
    );