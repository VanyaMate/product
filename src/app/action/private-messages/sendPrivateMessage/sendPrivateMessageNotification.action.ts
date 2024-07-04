import {
    assertDomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageData';


export const sendPrivateMessageNotificationAction = async function (notification: unknown) {
    assertDomainNotificationPrivateMessageData(notification, 'notification', 'DomainNotificationPrivateMessageData');
    return notification;
};