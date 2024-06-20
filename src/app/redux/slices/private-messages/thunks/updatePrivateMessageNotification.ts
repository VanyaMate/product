import {
    createNotificationAction,
} from '@/app/redux/lib/createNotificationAction.ts';
import {
    DomainNotificationPrivateMessageRedactedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationPrivateMessageRedactedData';


export const updatePrivateMessageNotification = createNotificationAction<DomainNotificationPrivateMessageRedactedData>('private-messages/updatePrivateMessageNotification');