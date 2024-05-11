import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationNotificatorCallback,
} from '@/shared/services/notification/notificator/notification-notificator.interface.ts';
import {
    NotificationConnectorConnectOptions,
} from '@/shared/services/notification/connector/notification-connector.interface.ts';


export interface INotificationController {
    connect (url: string, getOptions: () => NotificationConnectorConnectOptions): void;

    disconnect (): void;

    subscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void;

    unsubscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void;
}