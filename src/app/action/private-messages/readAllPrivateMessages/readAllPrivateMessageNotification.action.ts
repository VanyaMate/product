import {
    assertDomainNotificationPrivateMessageReadAllData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageReadAllData';


export const readAllPrivateMessageNotificationAction = async function (notification: unknown) {
    assertDomainNotificationPrivateMessageReadAllData(notification, 'notification', 'DomainNotificationPrivateMessageReadAllData');
    return notification;
};