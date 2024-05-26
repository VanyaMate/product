import {
    DomainNotification, DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';


export interface INotificationParser {
    getMessages (response: string): string[];

    getNotification (message: string): DomainNotification;

    getNotifications (messages: string[]): DomainNotification[];

    getClearNotification (type: DomainNotificationType): DomainNotification;
}