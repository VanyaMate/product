import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationShortItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationShortItemIcon,
} from '@/entities/notification/icon/NotificationShortItemIcon/ui/NotificationShortItemIcon.tsx';
import {
    NotificationTitle,
} from '@/entities/notification/title/NotificationTitle/ui/NotificationTitle.tsx';
import {
    NotificationShortBody,
} from '@/widgets/notification/body/NotificationShortBody/ui/NotificationShortBody.tsx';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';


export type NotificationShortItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationShortItem: FC<NotificationShortItemProps> = memo(function NotificationShortItem (props) {
    const { className, notification, ...other } = props;

    return (
        <article
            { ...other }
            aria-label="#"
            className={ classNames(css.container, { [css.new]: !notification.viewed }, [ className ]) }
            tabIndex={ 0 }
        >
            <header className={ css.header }>
                <div className={ css.info }>
                    <NotificationShortItemIcon
                        className={ css.icon }
                        type={ notification.type }
                    />
                    <h3 className={ css.title }>
                        <NotificationTitle type={ notification.type }/>
                    </h3>
                </div>
            </header>
            <NotificationShortBody
                className={ css.body }
                notification={ notification }
            />
            <NotificationItemFooter
                creationTime={ notification.creationDate }
            />
        </article>
    );
});