import {
    DomainNotificationPrivateMessageDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageDeletedData';
import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';


export const removePrivateMessageNotification = createNotificationAction<DomainNotificationPrivateMessageDeletedData>('private-messages/remove-private-message-notification');