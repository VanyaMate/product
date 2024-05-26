import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationDefaultLayout.module.scss';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';
import {
    NotificationHeader,
} from '@/entities/notification/header/NotificationHeader/ui/NotificationHeader.tsx';


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
            <NotificationHeader type={ type } viewed={ viewed }/>
            { children }
            <NotificationItemFooter
                creationTime={ creationDate }
            />
        </article>
    );
});