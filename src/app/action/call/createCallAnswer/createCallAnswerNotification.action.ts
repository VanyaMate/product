import {
    assertDomainNotificationCallAnswerData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallAnswerData';


export const createCallAnswerNotificationAction = async function (notification: unknown) {
    assertDomainNotificationCallAnswerData(notification, 'notification', 'DomainNotificationCallAnswerData');
    return notification;
};