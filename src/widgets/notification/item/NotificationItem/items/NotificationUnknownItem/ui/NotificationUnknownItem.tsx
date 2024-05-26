import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';


export type NotificationUnknownItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUnknownItem: FC<NotificationUnknownItemProps> = memo(function NotificationUnknownItem (props) {
    const { className, notification, ...other } = props;

    return (
        <NotificationDefaultLayout
            className={ className }
            creationDate={ notification.creationDate }
            type={ notification.type }
            viewed={ notification.viewed ?? true }
            { ...other }
        >
            <p>{ JSON.stringify(notification.data) }</p>
        </NotificationDefaultLayout>
    );
});