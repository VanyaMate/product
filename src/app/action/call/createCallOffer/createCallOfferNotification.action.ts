import {
    assertDomainNotificationCallOfferData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallOfferData';


export const createCallOfferNotificationAction = async function (notification: unknown) {
    assertDomainNotificationCallOfferData(notification, 'notification', 'DomainNotificationCallOfferData');
    return notification;
};