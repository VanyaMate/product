import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainNotificationCallFinishData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallFinishData';


export const finishCallAction = function (callId: string) {
    return request(
        `v1/call/finish/${ callId }`,
        { method: 'POST' },
        isDomainNotificationCallFinishData,
    );
};