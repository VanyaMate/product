import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';


export type NotificationConnectingItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationConnectingItem: FC<NotificationConnectingItemProps> = memo(function NotificationConnectedItem (props) {
    const { notification, ...other } = props;

    return (
        <NotificationDefaultLayout
            creationDate={ notification.creationDate }
            type={ notification.type }
            viewed={ notification.viewed }
            { ...other }
        />
    );
});