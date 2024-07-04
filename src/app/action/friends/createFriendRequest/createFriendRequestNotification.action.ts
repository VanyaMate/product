import {
    assertDomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';


export const createFriendRequestNotificationAction = async function (notification: unknown) {
    assertDomainNotificationFriendRequestData(notification, 'notification', `DomainNotificationFriendRequestData`);
    return notification;
};