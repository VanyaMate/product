import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    NotificationConnectorConnectOptions,
} from '@/features/notification/services/connector/notification-connector.interface.ts';


export interface INotificationController {
    isConnected (): boolean;

    connect (url: string, getOptions: () => NotificationConnectorConnectOptions): void;

    disconnect (): void;

    subscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void;

    unsubscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void;

    emitEvent (type: DomainNotificationType, events: Array<DomainNotification>): void;

    subscribeOnAll (callback: NotificationNotificatorCallback): void;

    unsubscribeFromAll (callback: NotificationNotificatorCallback): void;
}