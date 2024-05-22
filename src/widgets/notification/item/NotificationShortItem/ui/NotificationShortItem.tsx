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
    getDeltaByDates,
} from '@vanyamate/helpers/date/getDeltaByDates/getDeltaByDates';
import {
    getStringDeltaByDates,
} from '@vanyamate/helpers/date/getStringDeltaByDates/getStringDeltaByDates';
import {
    NotificationShortBody
} from '@/widgets/notification/body/NotificationShortBody/ui/NotificationShortBody.tsx';


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
            className={ classNames(css.container, {}, [ className ]) }
        >
            <header className={ css.header }>
                <NotificationShortItemIcon
                    className={ css.icon }
                    type={ notification.type }
                />
                <h3 className={ css.title }>
                    <NotificationTitle type={ notification.type }/>
                </h3>
            </header>
            <NotificationShortBody
                className={ css.body }
                notification={ notification }
            />
            <footer className={ css.footer }>
                <p className={ css.time }>{ getStringDeltaByDates(getDeltaByDates(notification.creationDate, Date.now())) }</p>
            </footer>
        </article>
    );
});