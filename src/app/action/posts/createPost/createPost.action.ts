import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';
import {
    isDomainNotificationPostCreateData
} from 'product-types/dist/notification/notification-data-types/post/DomainNotificationPostCreateData';


export const createPostAction = (createData: DomainPostCreateData) =>
    request(
        `v1/post`,
        { method: 'POST', body: JSON.stringify(createData) },
        isDomainNotificationPostCreateData,
    );