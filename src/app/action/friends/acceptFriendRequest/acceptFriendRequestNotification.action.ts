import {
    assertDomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';


export const acceptFriendRequestNotificationAction = async function (notification: unknown) {
    assertDomainNotificationFriendRequestAcceptedData(notification, 'notification', `DomainNotificationFriendRequestAcceptedData`);
    return notification;
};