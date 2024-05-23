import {
    DomainNotification, DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    isDomainNotificationErrorData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationErrorData';
import {
    NotificationErrorBody,
} from '@/widgets/notification/body/NotificationErrorBody/ui/NotificationErrorBody.tsx';
import {
    isDomainNotificationTokensUpdateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationTokensUpdateData';
import {
    NotificationTokensUpdateBody,
} from '@/widgets/notification/body/NotificationTokensUpdateBody/ui/NotificationTokensUpdateBody.tsx';
import {
    isDomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import {
    NotificationUserMessageBody,
} from '@/widgets/notification/body/NotificationUserMessageBody/ui/NotificationUserMessageBody.tsx';
import {
    isDomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    NotificationFriendRequestBody,
} from '@/widgets/notification/body/NotificationFriendRequestBody/ui/NotificationFriendRequestBody.tsx';


export type NotificationShortBodyProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationShortBody: FC<NotificationShortBodyProps> = memo(function NotificationShortBody (props) {
    const { notification, ...other } = props;

    switch (notification.type) {
        case DomainNotificationType.ERROR:
            return isDomainNotificationErrorData(notification.data)
                   ? <NotificationErrorBody
                       data={ notification.data } { ...other }/>
                   : null;
        case DomainNotificationType.UNKNOWN:
            break;
        case DomainNotificationType.CONNECTED:
            break;
        case DomainNotificationType.CONNECTING:
            break;
        case DomainNotificationType.DISCONNECTED:
            break;
        case DomainNotificationType.TOKENS_UPDATE:
            return isDomainNotificationTokensUpdateData(notification.data)
                   ? <NotificationTokensUpdateBody
                       data={ notification.data } { ...other }/>
                   : null;
        case DomainNotificationType.USER_MESSAGE:
            return isDomainNotificationUserMessageData(notification.data)
                   ? <NotificationUserMessageBody
                       data={ notification.data } { ...other }/>
                   : null;
        case DomainNotificationType.USER_MESSAGE_DELETED:
            break;
        case DomainNotificationType.USER_MESSAGE_REDACTED:
            break;
        case DomainNotificationType.USER_MESSAGE_READ:
            break;
        case DomainNotificationType.FRIEND_REQUEST:
            return isDomainNotificationFriendRequestData(notification.data)
                   ? <NotificationFriendRequestBody
                       data={ notification.data } { ...other }/>
                   : null;
        case DomainNotificationType.FRIEND_DELETED:
            break;
        case DomainNotificationType.FRIEND_REQUEST_ACCEPTED:
            break;
        case DomainNotificationType.FRIEND_REQUEST_CANCELED:
            break;
        default:
            break;
    }
});