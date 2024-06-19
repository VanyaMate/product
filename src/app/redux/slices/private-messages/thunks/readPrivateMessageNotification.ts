import {
    DomainNotificationPrivateMessageReadData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageReadData';
import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';


export const readPrivateMessageNotification = createNotificationAction<DomainNotificationPrivateMessageReadData>('private-messages/read-private-message-notification');