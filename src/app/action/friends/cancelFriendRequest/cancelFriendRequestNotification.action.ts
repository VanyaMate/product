import {
    assertDomainNotificationFriendRequestCanceledData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestCanceledData';


export const cancelFriendRequestNotificationAction = async function (notification: unknown) {
    assertDomainNotificationFriendRequestCanceledData(notification, 'notification', `DomainNotificationFriendRequestCanceledData`);
    return notification;
};