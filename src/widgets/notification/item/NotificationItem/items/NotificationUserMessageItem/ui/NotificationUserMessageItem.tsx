import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';
import { IoArrowForward } from 'react-icons/io5';
import {
    NotificationLinkLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationLinkLayout/ui/NotificationLinkLayout.tsx';
import css from './NotificationUserMessageItem.module.scss';
import {
    isDomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageData';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import {
    TranslationNotificationsMessage,
} from '@/features/i18n/types/translations.ts';
import { getRouteUrl } from '@/app/routes/lib/getRouteUrl.ts';
import {
    SITE_ROUTE_PARAM_DIALOGUE_ID, SITE_ROUTE_PARAM_USER_LOGIN,
    SiteAppRoute,
    SiteAppRoutePath,
} from '@/app/routes/main-site/config/routes.tsx';


export type NotificationUserMessageItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationUserMessageItem: FC<NotificationUserMessageItemProps> = memo(function NotificationUserMessageItem (props) {
    const { className, notification, ...other } = props;
    const { t, replace }                        = useTranslation();
    const linkOnMessageAriaLabel                = useMemo(() => {
        if (isDomainNotificationUserMessageData(notification.data)) {
            const message = t.notifications.message[notification.type as keyof TranslationNotificationsMessage];
            if (message) {
                return replace(message, {
                    user_login   : notification.data.message.author.login,
                    dialogue_name: notification.data.dialogue.title,
                    message      : notification.data.message.message,
                });
            }
            return '';
        }
        return '';
    }, [ notification.data, notification.type, replace, t.notifications.message ]);
    const linkToMessage                         = useMemo(() => {
        if (isDomainNotificationUserMessageData(notification.data)) {
            return getRouteUrl(SiteAppRoutePath[SiteAppRoute.DIALOGUES], {
                [SITE_ROUTE_PARAM_DIALOGUE_ID]: notification.data.dialogue.id,
            }) + `#${ notification.data.message.id }`;
        }
        return '#';
    }, [ notification.data ]);


    if (isDomainNotificationUserMessageData(notification.data)) {
        return (
            <NotificationLinkLayout
                className={ className }
                linkAria={ linkOnMessageAriaLabel }
                linkTo={ linkToMessage }
                message={ notification.data.message.message }
                notification={ notification }
                outside={
                    <div className={ css.container }>
                        <Link
                            aria-label={
                                replace(t.app.go_to_user_page_of, {
                                    login: notification.data.message.author.login,
                                })
                            }
                            to={
                                getRouteUrl(SiteAppRoutePath[SiteAppRoute.USER], {
                                    [SITE_ROUTE_PARAM_USER_LOGIN]: notification.data.message.author.login,
                                })
                            }
                        >
                            { notification.data.message.author.login }
                        </Link>
                        <IoArrowForward/>
                        <Link
                            aria-label={
                                replace(t.app.dialogue_page, {
                                    login: notification.data.dialogue.title,
                                })
                            }
                            to={
                                getRouteUrl(SiteAppRoutePath[SiteAppRoute.DIALOGUES], {
                                    [SITE_ROUTE_PARAM_DIALOGUE_ID]: notification.data.dialogue.id,
                                })
                            }
                        >
                            { notification.data.dialogue.title }
                        </Link>
                    </div>
                }
            />
        );
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

