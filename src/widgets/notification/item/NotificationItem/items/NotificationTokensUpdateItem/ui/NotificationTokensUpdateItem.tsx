import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';


export type NotificationTokensUpdateItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationTokensUpdateItem: FC<NotificationTokensUpdateItemProps> = memo(function NotificationTokensUpdateItem (props) {
    const { notification, ...other } = props;

    return (
        <NotificationDefaultLayout
            { ...other }
            creationDate={ notification.creationDate }
            type={ notification.type }
            viewed={ notification.viewed }
        />
    );
});