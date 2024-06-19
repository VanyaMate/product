import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    isDomainNotificationFriendDeletedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendDeletedData';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationLinkLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationLinkLayout/ui/NotificationLinkLayout.tsx';
import { getUserPageUrl } from '@/features/routes/lib/getUserPageUrl.ts';
import { getUserPageLinkAria } from '@/app/i18n/lib/getUserPageLinkAria.ts';


export type NotificationFriendDeletedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationFriendDeletedItem: FC<NotificationFriendDeletedItemProps> = memo(function NotificationFriendDeletedItem (props) {
    const { className, notification, ...other } = props;

    if (isDomainNotificationFriendDeletedData(notification.data)) {
        const linkAria = getUserPageLinkAria(notification.data.user.login);
        const linkTo   = getUserPageUrl(notification.data.user.login);

        return <NotificationLinkLayout
            { ...other }
            className={ className }
            linkAria={ linkAria }
            linkTo={ linkTo }
            notification={ notification }
            outside={
                <Link
                    aria-label={ linkAria }
                    to={ linkTo }
                >
                    { notification.data.user.login }
                </Link>
            }
        />;
    } else {
        return (
            <NotificationDefaultLayout
                creationDate={ notification.creationDate }
                type={ notification.type }
                viewed={ true }
                { ...other }
            >
                <p>{ JSON.stringify(notification.data) }</p>
            </NotificationDefaultLayout>
        );
    }
});