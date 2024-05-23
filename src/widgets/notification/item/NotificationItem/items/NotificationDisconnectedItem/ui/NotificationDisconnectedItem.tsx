import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';
import {
    NotificationDisconnectedBody,
} from '@/widgets/notification/body/NotificationDisconnectedBody/ui/NotificationDisconnectedBody.tsx';
import {
    NotificationItemBody,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationItemBody/ui/NotificationItemBody.tsx';
import {
    isDomainNotificationDisconnectedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationDisconnectedData';


export type NotificationDisconnectedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationDisconnectedItem: FC<NotificationDisconnectedItemProps> = memo(function NotificationDisconnectedItem (props) {
    const { notification, ...other } = props;

    return (
        <NotificationDefaultLayout
            creationDate={ notification.creationDate }
            type={ notification.type }
            viewed={ notification.viewed }
            { ...other }
        >
            <NotificationItemBody
                BodyComponent={ NotificationDisconnectedBody }
                data={ notification.data }
                validationMethod={ isDomainNotificationDisconnectedData }
            />
        </NotificationDefaultLayout>
    );
});