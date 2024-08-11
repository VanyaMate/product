import {
    assertDomainNotificationPrivateMessageReadData
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageReadData';


export const readPrivateMessageNotificationAction = async function (notification: unknown) {
    assertDomainNotificationPrivateMessageReadData(notification, 'notification', 'DomainNotificationPrivateMessageReadData');
    return notification;
};