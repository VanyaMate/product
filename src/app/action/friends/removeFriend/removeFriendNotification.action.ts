import {
    assertDomainNotificationFriendDeletedData
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendDeletedData';


export const removeFriendNotificationAction = async function (notification: unknown) {
    assertDomainNotificationFriendDeletedData(notification, 'notification', `DomainNotificationFriendDeletedData(`);
    return notification;
};