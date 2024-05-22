import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    IoCloud,
    IoCloudDone,
    IoCloudOffline, IoMail, IoMailOpen, IoMailUnread,
    IoNotifications, IoPersonAdd, IoPersonRemove,
    IoSad, IoSync, IoTrash,
} from 'react-icons/io5';
import css
    from '@/entities/notification/icon/NotificationShortItemIcon/ui/NotificationShortItemIcon.module.scss';
import { IconType } from 'react-icons';


export type NotificationShortItemIconOptions = {
    component: IconType,
    className: string,
}

export const NotificationIconByType: Record<DomainNotificationType, NotificationShortItemIconOptions> = {
    [DomainNotificationType.ERROR]                  : {
        component: IoSad,
        className: css.negative,
    },
    [DomainNotificationType.UNKNOWN]                : {
        component: IoNotifications,
        className: css.neutral,
    },
    [DomainNotificationType.CONNECTED]              : {
        component: IoCloudDone,
        className: css.positive,
    },
    [DomainNotificationType.CONNECTING]             : {
        component: IoCloud,
        className: css.neutral,
    },
    [DomainNotificationType.DISCONNECTED]           : {
        component: IoCloudOffline,
        className: css.negative,
    },
    [DomainNotificationType.TOKENS_UPDATE]          : {
        component: IoSync,
        className: css.neutral,
    },
    [DomainNotificationType.USER_MESSAGE]           : {
        component: IoMailUnread,
        className: css.positive,
    },
    [DomainNotificationType.USER_MESSAGE_DELETED]   : {
        component: IoTrash,
        className: css.neutral,
    },
    [DomainNotificationType.USER_MESSAGE_REDACTED]  : {
        component: IoMail,
        className: css.neutral,
    },
    [DomainNotificationType.USER_MESSAGE_READ]      : {
        component: IoMailOpen,
        className: css.neutral,
    },
    [DomainNotificationType.FRIEND_REQUEST]         : {
        component: IoPersonAdd,
        className: css.positive,
    },
    [DomainNotificationType.FRIEND_DELETED]         : {
        component: IoPersonRemove,
        className: css.negative,
    },
    [DomainNotificationType.FRIEND_REQUEST_ACCEPTED]: {
        component: IoPersonAdd,
        className: css.notification,
    },
    [DomainNotificationType.FRIEND_REQUEST_CANCELED]: {
        component: IoPersonRemove,
        className: css.negative,
    },
};