import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export const applyEffect = function (callback: (data: unknown) => void): NotificationNotificatorCallback {
    return (notifications: DomainNotification[]) => {
        notifications.forEach(({ data }) => callback(data));
    };
};