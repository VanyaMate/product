import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';
import {
    DomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageData';


export const sendPrivateMessageNotification = createNotificationAction<DomainNotificationPrivateMessageData>('private-messages/send-private-message');