import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationErrorBody,
} from '@/widgets/notification/body/NotificationErrorBody/ui/NotificationErrorBody.tsx';
import {
    isDomainNotificationErrorData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationErrorData';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';
import {
    NotificationItemBody,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationItemBody/ui/NotificationItemBody.tsx';


export type NotificationErrorItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationErrorItem: FC<NotificationErrorItemProps> = memo(function NotificationErrorItem (props) {
    const { notification, ...other } = props;

    return (
        <NotificationDefaultLayout
            creationDate={ notification.creationDate }
            type={ notification.type }
            viewed={ notification.viewed }
            { ...other }
        >
            <NotificationItemBody
                BodyComponent={ NotificationErrorBody }
                data={ notification.data }
                validationMethod={ isDomainNotificationErrorData }
            />
        </NotificationDefaultLayout>
    );
});