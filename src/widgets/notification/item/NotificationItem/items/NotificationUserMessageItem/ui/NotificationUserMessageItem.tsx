import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import { useTranslation } from 'react-i18next';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';
import {
    isDomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import { IoArrowForward } from 'react-icons/io5';
import {
    NotificationLinkLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationLinkLayout/ui/NotificationLinkLayout.tsx';
import css from './NotificationUserMessageItem.module.scss';


export type NotificationUserMessageItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationUserMessageItem: FC<NotificationUserMessageItemProps> = memo(function NotificationUserMessageItem (props) {
    const { className, notification, ...other } = props;
    const { t }                                 = useTranslation([ 'site-app', 'notification-links' ]);
    const linkOnMessageAriaLabel                = useMemo(() => {
        if (isDomainNotificationUserMessageData(notification.data)) {
            return t(notification.type, {
                ns           : 'notification-links',
                user_login   : notification.data.message.author.login,
                dialogue_name: notification.data.dialogue.title,
                message      : notification.data.message.message,
            });
        }
        return '';
    }, [ notification.data, notification.type, t ]);
    const linkToMessage                         = useMemo(() => {
        if (isDomainNotificationUserMessageData(notification.data)) {
            return `/dialogue/${ notification.data.dialogue.id }#${ notification.data.message.id }`;
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
                            aria-label={ t('go_to_user_page_of', {
                                login: notification.data.message.author.login,
                            }) }
                            to={ `/user/${ notification.data.message.author.login }` }
                        >
                            { notification.data.message.author.login }
                        </Link>
                        <IoArrowForward/>
                        <Link
                            aria-label={ t('dialogue_page', {
                                ns   : 'site-app',
                                login: notification.data.dialogue.title,
                            }) }
                            to={ `/dialogue/${ notification.data.dialogue.id }` }
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

