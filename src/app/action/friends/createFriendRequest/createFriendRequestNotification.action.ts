import {
    assertDomainNotificationFriendRequestData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestData';


export const createFriendRequestNotificationAction = async function (notification: unknown) {
    assertDomainNotificationFriendRequestData(notification, 'notification', `DomainNotificationFriendRequestData`);
    return notification;
};