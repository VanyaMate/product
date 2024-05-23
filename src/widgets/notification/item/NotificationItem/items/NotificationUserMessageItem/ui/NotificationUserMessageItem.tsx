import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUserMessageItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import { useTranslation } from 'react-i18next';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationShortItemIcon,
} from '@/entities/notification/icon/NotificationShortItemIcon/ui/NotificationShortItemIcon.tsx';
import {
    NotificationTitle,
} from '@/entities/notification/title/NotificationTitle/ui/NotificationTitle.tsx';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';
import {
    isDomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';


export type NotificationUserMessageItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUserMessageItem: FC<NotificationUserMessageItemProps> = memo(function NotificationUserMessageItem (props) {
    const { className, notification, ...other } = props;
    const { t }                                 = useTranslation();

    if (isDomainNotificationUserMessageData(notification.data)) {
        return (
            <article
                className={ classNames(css.container, {}, [ className ]) }
            >
                <Link
                    aria-label={ t('dialogue_page', {
                        ns           : 'site-app',
                        dialogue_name: notification.data.dialogue.title,
                    }) }
                    className={ css.backgroundLink }
                    to={ `/dialogue/${ notification.data.dialogue.id }` }
                />
                <div className={ css.content }>
                    <header className={ css.header }>
                        <NotificationShortItemIcon className={ css.icon }
                                                   type={ notification.type }/>
                        <h3 className={ css.title }>
                            <NotificationTitle type={ notification.type }/>
                        </h3>
                        <Link
                            aria-label={ t('profile_page', {
                                ns   : 'site-app',
                                login: notification.data.message.author.login,
                            }) }
                            to={ `/profile/${ notification.data.message.author.login }` }
                        >
                            { notification.data.message.author.login }
                        </Link>
                    </header>
                    <p>{ notification.data.message.message }</p>
                    <NotificationItemFooter
                        creationTime={ notification.creationDate }
                        viewed={ true }
                    />
                </div>
            </article>
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