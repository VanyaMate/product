import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationFriendDeletedItem.module.scss';
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
    NotificationShortItemIcon,
} from '@/entities/notification/icon/NotificationShortItemIcon/ui/NotificationShortItemIcon.tsx';
import {
    NotificationTitle,
} from '@/entities/notification/title/NotificationTitle/ui/NotificationTitle.tsx';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';


export type NotificationFriendDeletedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationFriendDeletedItem: FC<NotificationFriendDeletedItemProps> = memo(function NotificationFriendDeletedItem (props) {
    const { className, notification, ...other } = props;
    const { t }                                 = useTranslation();

    if (isDomainNotificationFriendDeletedData(notification.data)) {
        return (
            <article
                className={ classNames(css.container, {}, [ className ]) }
                tabIndex={ 0 }
            >
                <Link
                    aria-label={ t('profile', {
                        ns   : 'site-app',
                        login: notification.data.user.login,
                    }) }
                    to={ `/profile/${ notification.data.user.login }` }
                />
                <header>
                    <NotificationShortItemIcon type={ notification.type }/>
                    <h3><NotificationTitle type={ notification.type }/></h3>
                    <Link
                        aria-label={ t('profile', {
                            ns   : 'site-app',
                            login: notification.data.user.login,
                        }) }
                        to={ `/profile/${ notification.data.user.login }` }
                    >
                        { notification.data.user.login }
                    </Link>
                </header>
                <NotificationItemFooter
                    creationTime={ notification.creationDate }
                    viewed={ true }
                />
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