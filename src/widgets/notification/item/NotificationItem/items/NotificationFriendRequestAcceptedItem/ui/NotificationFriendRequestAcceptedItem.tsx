import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationLinkLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationLinkLayout/ui/NotificationLinkLayout.tsx';
import {
    NotificationUnknownItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUnknownItem/ui/NotificationUnknownItem.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    assertDomainNotificationFriendRequestAcceptedData,
    isDomainNotificationFriendRequestAcceptedData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestAcceptedData';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import {
    TranslationNotificationTitle,
} from '@/features/i18n/types/translations.ts';
import { getRouteUrl } from '@/app/routes/lib/getRouteUrl.ts';
import {
    SITE_ROUTE_PARAM_USER_LOGIN,
    SiteAppRoute,
    SiteAppRoutePath,
} from '@/app/routes/main-site/config/routes.tsx';


export type NotificationFriendRequestAcceptedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationFriendRequestAcceptedItem: FC<NotificationFriendRequestAcceptedItemProps> = memo(function NotificationFriendRequestAcceptedItem (props) {
    const { className, notification, ...other } = props;
    const { t, replace }                        = useTranslation();
    const ariaLabel: string                     = useMemo(() => {
        try {
            assertDomainNotificationFriendRequestAcceptedData(notification.data, '', '');
            const notificationTitle = t.notifications.title[notification.type as keyof TranslationNotificationTitle];

            if (notificationTitle) {
                const goToUserPageLabel = replace(t.app.go_to_user_page_of, {
                    login: notification.data.user.login,
                });

                return `${ notificationTitle } ${ goToUserPageLabel }`;
            }

            return '';
        } catch (_) {
            return '';
        }
    }, [ notification.data, notification.type, replace, t.app.go_to_user_page_of, t.notifications.title ]);
    const linkTo: string                        = useMemo(() =>
            isDomainNotificationFriendRequestAcceptedData(notification.data)
            ? getRouteUrl(
                SiteAppRoutePath[SiteAppRoute.USER],
                { [SITE_ROUTE_PARAM_USER_LOGIN]: notification.data.user.login },
            )
            : '#',
        [ notification.data ],
    );

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