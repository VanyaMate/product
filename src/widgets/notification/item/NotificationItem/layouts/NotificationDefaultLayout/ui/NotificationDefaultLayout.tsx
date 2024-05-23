import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationDefaultLayout.module.scss';
import {
    NotificationShortItemIcon,
} from '@/entities/notification/icon/NotificationShortItemIcon/ui/NotificationShortItemIcon.tsx';
import {
    NotificationTitle,
} from '@/entities/notification/title/NotificationTitle/ui/NotificationTitle.tsx';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';


export type NotificationDefaultLayoutProps =
    {
        type: DomainNotificationType;
        creationDate: string;
        viewed: boolean;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationDefaultLayout: FC<NotificationDefaultLayoutProps> = memo(function NotificationDefaultLayout (props) {
    const { className, creationDate, type, viewed, children, ...other } = props;

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            tabIndex={ 0 }
        >
            <header className={ css.header }>
                <NotificationShortItemIcon
                    className={ css.icon }
                    type={ type }
                />
                <h3 className={ css.title }>
                    <NotificationTitle type={ type }/>
                </h3>
            </header>
            { children }
            <NotificationItemFooter
                creationTime={ creationDate }
                viewed={ viewed }
            />
        </article>
    );
});