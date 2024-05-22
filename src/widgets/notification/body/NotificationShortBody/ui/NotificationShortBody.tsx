import {
    DomainNotification, DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    isDomainNotificationErrorData
} from 'product-types/dist/notification/notification-data-types/DomainNotificationErrorData';
import {
    NotificationShortBodyError
} from '@/widgets/notification/body/NotificationShortBodyError/ui/NotificationShortBodyError.tsx';
import {
    isDomainNotificationTokensUpdateData
} from 'product-types/dist/notification/notification-data-types/DomainNotificationTokensUpdateData';
import {
    NotificationShortBodyTokensUpdate
} from '@/widgets/notification/body/NotificationShortBodyTokensUpdate/ui/NotificationShortBodyTokensUpdate.tsx';
import {
    isDomainNotificationUserMessageData
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import {
    NotificationShortBodyUserMessage
} from '@/widgets/notification/body/NotificationShortBodyUserMessage/ui/NotificationShortBodyUserMessage.tsx';
import {
    isDomainNotificationFriendRequestData
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    NotificationShortBodyFriendRequest
} from '@/widgets/notification/body/NotificationShortBodyFriendRequest/ui/NotificationShortBodyFriendRequest.tsx';


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
                   ? <NotificationShortBodyError
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
                   ? <NotificationShortBodyTokensUpdate
                       data={ notification.data } { ...other }/>
                   : null;
        case DomainNotificationType.USER_MESSAGE:
            return isDomainNotificationUserMessageData(notification.data)
                   ? <NotificationShortBodyUserMessage
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
                   ? <NotificationShortBodyFriendRequest
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