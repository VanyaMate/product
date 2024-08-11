import {
    assertDomainNotificationPrivateMessageReadAllData,
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageReadAllData';


export const readAllPrivateMessageNotificationAction = async function (notification: unknown) {
    assertDomainNotificationPrivateMessageReadAllData(notification, 'notification', 'DomainNotificationPrivateMessageReadAllData');
    return notification;
};