import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationFriendRequestItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    isDomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import {
    NotificationUnknownItem,
} from '@/widgets/notification/item/NotificationItem/items/NotificationUnknownItem/ui/NotificationUnknownItem.tsx';
import { useTranslation } from 'react-i18next';
import {
    NotificationHeader,
} from '@/entities/notification/header/NotificationHeader/ui/NotificationHeader.tsx';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';


export type NotificationFriendRequestItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationFriendRequestItem: FC<NotificationFriendRequestItemProps> = memo(function NotificationFriendRequestItem (props) {
    const { className, notification, ...other } = props;
    const { t }                                 = useTranslation();

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
                        aria-label={ t('go_to_user_page_of', {
                            login: notification.data.user.login,
                        }) }
                        key="link"
                        to={ `/user/${ notification.data.user.login }` }
                    >
                        { notification.data.user.login }
                    </Link>
                    <div className={ css.buttons } key="buttons">
                        {/* eslint-disable-next-line i18next/no-literal-string */ }
                        <Button styleType={ ButtonStyleType.PRIMARY }>Принять</Button>
                        {/* eslint-disable-next-line i18next/no-literal-string */ }
                        <Button styleType={ ButtonStyleType.DANGER }>Отклонить</Button>
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