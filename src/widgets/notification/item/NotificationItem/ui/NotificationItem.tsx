import { FC, memo } from 'react';
import {
    DomainNotification, DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationErrorItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationErrorItem/ui/NotificationErrorItem.tsx';
import {
    NotificationUnknownItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUnknownItem/ui/NotificationUnknownItem.tsx';
import {
    NotificationConnectedItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationConnectedItem/ui/NotificationConnectedItem.tsx';
import {
    NotificationConnectingItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationConnectingItem/ui/NotificationConnectingItem.tsx';
import {
    NotificationDisconnectedItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationDisconnectedItem/ui/NotificationDisconnectedItem.tsx';
import {
    NotificationTokensUpdateItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationTokensUpdateItem/ui/NotificationTokensUpdateItem.tsx';
import {
    NotificationUserMessageItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUserMessageItem/ui/NotificationUserMessageItem.tsx';
import {
    NotificationUserMessageDeletedItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUserMessageDeletedItem/ui/NotificationUserMessageDeletedItem.tsx';
import {
    NotificationUserMessageRedactedItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUserMessageRedactedItem/ui/NotificationUserMessageRedactedItem.tsx';
import {
    NotificationUserMessageReadItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUserMessageReadItem/ui/NotificationUserMessageReadItem.tsx';
import {
    NotificationFriendRequestItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationFriendRequestItem/ui/NotificationFriendRequestItem.tsx';
import {
    NotificationFriendDeletedItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationFriendDeletedItem/ui/NotificationFriendDeletedItem.tsx';
import {
    NotificationFriendRequestAcceptedItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationFriendRequestAcceptedItem/ui/NotificationFriendRequestAcceptedItem.tsx';
import {
    NotificationFriendRequestCanceledItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationFriendRequestCanceledItem/ui/NotificationFriendRequestCanceledItem.tsx';
import {
    NotificationPrivateMessageItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationPrivateMessageItem/ui/NotificationPrivateMessageItem.tsx';


export type NotificationItemProps =
    {
        notification: DomainNotification;
    };

export const NotificationItem: FC<NotificationItemProps> = memo(function NotificationItem (props) {
    const { notification } = props;

    switch (notification.type) {
        case DomainNotificationType.ERROR:
            return <NotificationErrorItem notification={ notification }/>;
        case DomainNotificationType.UNKNOWN:
            return <NotificationUnknownItem notification={ notification }/>;
        case DomainNotificationType.CONNECTED:
            return <NotificationConnectedItem notification={ notification }/>;
        case DomainNotificationType.CONNECTING:
            return <NotificationConnectingItem notification={ notification }/>;
        case DomainNotificationType.DISCONNECTED:
            return <NotificationDisconnectedItem
                notification={ notification }/>;
        case DomainNotificationType.TOKENS_UPDATE:
            return <NotificationTokensUpdateItem
                notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_IN:
            return <NotificationUserMessageItem notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_OUT:
            return <NotificationUserMessageItem notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_DELETED_IN:
            return <NotificationUserMessageDeletedItem
                notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_DELETED_OUT:
            return <NotificationUserMessageDeletedItem
                notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_REDACTED_IN:
            return <NotificationUserMessageRedactedItem
                notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_REDACTED_OUT:
            return <NotificationUserMessageRedactedItem
                notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_READ_IN:
            return <NotificationUserMessageReadItem
                notification={ notification }/>;
        case DomainNotificationType.USER_MESSAGE_READ_OUT:
            return <NotificationUserMessageReadItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_IN:
            return <NotificationPrivateMessageItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_OUT:
            return <NotificationPrivateMessageItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_DELETED_IN:
            return <NotificationUserMessageDeletedItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_DELETED_OUT:
            return <NotificationUserMessageDeletedItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_REDACTED_IN:
            return <NotificationUserMessageRedactedItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_REDACTED_OUT:
            return <NotificationUserMessageRedactedItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_READ_IN:
            return <NotificationUserMessageReadItem
                notification={ notification }/>;
        case DomainNotificationType.PRIVATE_MESSAGE_READ_OUT:
            return <NotificationUserMessageReadItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_REQUEST_IN:
            return <NotificationFriendRequestItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_REQUEST_OUT:
            return <NotificationFriendRequestItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_DELETED_IN:
            return <NotificationFriendDeletedItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_DELETED_OUT:
            return <NotificationFriendDeletedItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN:
            return <NotificationFriendRequestAcceptedItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT:
            return <NotificationFriendRequestAcceptedItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_REQUEST_CANCELED_IN:
            return <NotificationFriendRequestCanceledItem
                notification={ notification }/>;
        case DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT:
            return <NotificationFriendRequestCanceledItem
                notification={ notification }/>;
        default:
            return <NotificationUnknownItem notification={ notification }/>;
    }
});