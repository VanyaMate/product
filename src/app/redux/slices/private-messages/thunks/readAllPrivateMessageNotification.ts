import {
    DomainNotificationPrivateMessageReadAllData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageReadAllData';
import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';


export const readAllPrivateMessageNotification = createNotificationAction<DomainNotificationPrivateMessageReadAllData>('private-messages/read-all-private-message-notification');