import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import { useTranslation } from 'react-i18next';
import {
    isDomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestAcceptedData';
import {
    NotificationLinkLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationLinkLayout/ui/NotificationLinkLayout.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationUnknownItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUnknownItem/ui/NotificationUnknownItem.tsx';


export type NotificationFriendRequestCanceledItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationFriendRequestCanceledItem: FC<NotificationFriendRequestCanceledItemProps> = memo(function NotificationFriendRequestCanceledItem (props) {
    const { className, notification, ...other } = props;
    const { t }                                 = useTranslation([ 'site-app', 'notification-messages', 'translation' ]);
    const ariaLabel: string                     = useMemo(() =>
        isDomainNotificationFriendRequestAcceptedData(notification.data)
        ? t(notification.type, { ns: 'notification-messages' }) + '. ' + t('go_to_user_page_of', {
            ns   : 'translation',
            login: notification.data.user.login,
        })
        : '', [ notification.data, notification.type, t ]);
    const linkTo: string                        = useMemo(() =>
        isDomainNotificationFriendRequestAcceptedData(notification.data)
        ? `/user/${ notification.data.user.login }`
        : '#', [ notification.data ]);

    if (isDomainNotificationFriendRequestAcceptedData(notification.data)) {
        return (
            <NotificationLinkLayout
                { ...other }
                className={ className }
                linkAria={ ariaLabel }
                linkTo={ linkTo }
                notification={ notification }
                outside={
                    <Link
                        aria-label={ ariaLabel }
                        to={ linkTo }
                    >
                        { notification.data.user.login }
                    </Link>
                }
            />
        );
    }
    return (
        <NotificationUnknownItem notification={ notification }/>
    );
});