import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationNotificatorCallback = (notifications: DomainNotification[]) => void;

export interface INotificationNotificator {
    subscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void;

    unsubscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void;
}