import { ComponentPropsWithoutRef, FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import css from './NotificationLinkLayout.module.scss';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationHeader,
} from '@/entities/notification/header/NotificationHeader/ui/NotificationHeader.tsx';
import {
    NotificationItemFooter,
} from '@/widgets/notification/footer/NotificationItemFooter/ui/NotificationItemFooter.tsx';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationLinkLayoutProps =
    {
        notification: DomainNotification;
        linkTo: string;
        linkAria: string;
        message: ReactNode;
        outside?: ReactNode;
        extra?: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationLinkLayout: FC<NotificationLinkLayoutProps> = memo(function NotificationLinkLayout (props) {
    const {
              className,
              notification,
              linkAria,
              linkTo,
              message,
              outside,
              extra,
              ...other
          } = props;

    return (
        <article
            className={ classNames(css.container, { [css.viewed]: notification.viewed }, [ className ]) }
            { ...other }
        >
            <div className={ css.content }>
                <Link
                    aria-label={ linkAria }
                    className={ css.backgroundLink }
                    to={ linkTo }
                >
                    <NotificationHeader
                        type={ notification.type }
                        viewed={ notification.viewed }
                    >
                        { extra }
                    </NotificationHeader>
                    <p className={ css.message }>{ message }</p>
                </Link>
                <NotificationItemFooter
                    creationTime={ notification.creationDate }
                >
                    { outside }
                </NotificationItemFooter>
            </div>
        </article>
    );
});