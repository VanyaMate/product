import {
    assertDomainNotificationCallStartData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallStartData';


export const createCallRequestNotificationAction = async function (notification: unknown) {
    assertDomainNotificationCallStartData(notification, 'notification', 'DomainNotificationCallStartData');
    return notification;
};