import {
    assertDomainNotificationFriendRequestAcceptedData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestAcceptedData';


export const acceptFriendRequestNotificationAction = async function (notification: unknown) {
    assertDomainNotificationFriendRequestAcceptedData(notification, 'notification', `DomainNotificationFriendRequestAcceptedData`);
    return notification;
};