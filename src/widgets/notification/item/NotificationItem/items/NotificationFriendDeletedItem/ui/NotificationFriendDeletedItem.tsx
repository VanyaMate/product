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
import { useTranslation } from 'react-i18next';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationLinkLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationLinkLayout/ui/NotificationLinkLayout.tsx';


export type NotificationFriendDeletedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationFriendDeletedItem: FC<NotificationFriendDeletedItemProps> = memo(function NotificationFriendDeletedItem (props) {
    const { className, notification, ...other } = props;
    const { t }                                 = useTranslation('site-app');

    if (isDomainNotificationFriendDeletedData(notification.data)) {
        return <NotificationLinkLayout
            { ...other }
            className={ className }
            linkAria={ t('profile_page', {
                ns   : 'site-app',
                login: notification.data.user.login,
            }) }
            linkTo={ `/profile/${ notification.data.user.login }` }
            notification={ notification }
            outside={
                <Link
                    to={ `/profile/${ notification.data.user.login }` }
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