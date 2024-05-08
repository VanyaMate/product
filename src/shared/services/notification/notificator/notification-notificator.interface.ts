import {
    DomainNotification,
    NotificationType,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationNotificatorCallback = (notifications: DomainNotification[]) => void;

export interface INotificationNotificator {
    subscribe (on: NotificationType, callback: NotificationNotificatorCallback): void;

    unsubscribe (on: NotificationType, callback: NotificationNotificatorCallback): void;
}