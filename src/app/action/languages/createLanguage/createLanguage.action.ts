import {
    DomainLanguageCreateData,
} from 'product-types/dist/language/DomainLanguageCreateData';
import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationLanguageCreateData,
} from 'product-types/dist/notification/notification-data-types/language/DomainNotificationLanguageCreateData';


export const createLanguageAction = function (createData: DomainLanguageCreateData) {
    return request(
        `v1/language`,
        {
            method: 'POST',
            body  : JSON.stringify(createData),
            isJson: true,
        },
        isDomainNotificationLanguageCreateData,
    );
};