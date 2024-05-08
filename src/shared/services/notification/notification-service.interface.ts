import {
    DomainNotification,
    NotificationType,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationCallback = (notification: DomainNotification) => void;
export type NotificationServiceCallback = (notification: string) => void;

export enum NotificationServiceEvents {
    CONNECTED     = 'connected',
    CONNECT_ERROR = 'connect_error',
    CONNECTING    = 'connecting',
    DISCONNECTED  = 'disconnected',
}


export interface INotificationService {
    status: NotificationServiceEvents;

    subscribe (on: NotificationType, callback: NotificationCallback): void;

    unsubscribe (on: NotificationType, callback: NotificationCallback): void;

    subscribeService (on: NotificationServiceEvents, callback: NotificationServiceCallback): void;

    unsubscribeService (on: NotificationServiceEvents, callback: NotificationServiceCallback): void;
}