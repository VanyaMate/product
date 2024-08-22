import {
    assertDomainNotificationCallFinishData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallFinishData';


export const finishCallNotificationAction = async function (notification: unknown) {
    assertDomainNotificationCallFinishData(notification, 'notification', 'DomainNotificationCallFinishData');
    return notification;
};