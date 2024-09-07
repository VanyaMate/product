import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationFriendRequestItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationUnknownItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUnknownItem/ui/NotificationUnknownItem.tsx';
import {
    NotificationHeader,
} from '@/entities/notification/header/NotificationHeader/ui/NotificationHeader.tsx';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    isDomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/friend/DomainNotificationFriendRequestData';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { getRouteUrl } from '@/app/routes/lib/getRouteUrl.ts';
import {
    SITE_ROUTE_PARAM_USER_LOGIN,
    SiteAppRoute,
    SiteAppRoutePath,
} from '@/app/routes/main-site/config/routes.tsx';


export type NotificationFriendRequestItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationFriendRequestItem: FC<NotificationFriendRequestItemProps> = memo(function NotificationFriendRequestItem (props) {
    const { className, notification, ...other } = props;
    const { t, replace }                        = useTranslation();

    if (isDomainNotificationFriendRequestData(notification.data)) {
        return (
            <article
                { ...other }
                className={ classNames(css.container, { [css.viewed]: notification.viewed }, [ className ]) }
            >
                <NotificationHeader
                    tabIndex={ 0 }
                    type={ notification.type }
                    viewed={ notification.viewed }
                />
                <div className={ css.content }>
                    {
                        notification.data.message
                        ? <p
                            className={ css.message }>{ notification.data.message }</p>
                        : null
                    }
                    <Link
                        aria-label={
                            replace(t.app.go_to_user_page_of, {
                                login: notification.data.user.login,
                            })
                        }
                        key="link"
                        to={
                            getRouteUrl(
                                SiteAppRoutePath[SiteAppRoute.USER],
                                { [SITE_ROUTE_PARAM_USER_LOGIN]: notification.data.user.login },
                            )
                        }
                    >
                        { notification.data.user.login }
                    </Link>
                    <div className={ css.buttons } key="buttons">
                        <Button
                            styleType={ ButtonStyleType.PRIMARY }
                        >
                            { t.buttons.accept }
                        </Button>
                        <Button
                            styleType={ ButtonStyleType.DANGER }
                        >
                            { t.buttons.cancel }
                        </Button>
                    </div>
                </div>
                <NotificationItemFooter
                    creationTime={ notification.creationDate }
                />
            </article>
        );
    } else {
        return (
            <NotificationUnknownItem
                { ...other }
                className={ className }
                notification={ notification }
            />
        );
    }
});