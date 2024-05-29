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
    const { t }                                 = useTranslation();

    if (isDomainNotificationFriendDeletedData(notification.data)) {
        const linkAria = t('go_to_user_page_of', {
            login: notification.data.user.login,
        });
        const linkTo   = `/user/${ notification.data.user.login }`;

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