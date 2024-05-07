import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationSchema = {
    connected: boolean;
    connecting: boolean;
    notifications: DomainNotification[];
}