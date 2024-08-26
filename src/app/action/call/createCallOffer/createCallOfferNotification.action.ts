import {
    assertDomainNotificationCallOfferData, DomainNotificationCallOfferData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallOfferData';
import {
    CallAnswerResponse,
    createCallAnswerAction,
} from '@/app/action/call/createCallAnswer/createCallAnswer.action.ts';


export const createCallOfferNotificationAction = async function (notification: unknown): Promise<[ DomainNotificationCallOfferData, CallAnswerResponse ]> {
    assertDomainNotificationCallOfferData(notification, 'notification', 'DomainNotificationCallOfferData');
    const answer = await createCallAnswerAction(notification.call.id, notification.offer);
    return [ notification, answer ];
};