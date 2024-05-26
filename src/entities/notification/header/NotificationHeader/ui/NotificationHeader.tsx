import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationHeader.module.scss';
import {
    NotificationShortItemIcon,
} from '@/entities/notification/icon/NotificationShortItemIcon/ui/NotificationShortItemIcon.tsx';
import {
    NotificationTitle,
} from '@/entities/notification/title/NotificationTitle/ui/NotificationTitle.tsx';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationHeaderProps =
    {
        viewed: boolean;
        type: DomainNotificationType;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationHeader: FC<NotificationHeaderProps> = memo(function NotificationHeader (props) {
    const { className, type, viewed, children, ...other } = props;

    return (
        <header
            className={ classNames(css.container, { [css.new]: !viewed }, [ className ]) }
        >
            <div className={ css.header } { ...other }>
                <NotificationShortItemIcon
                    className={ css.icon }
                    type={ type }
                />
                <h3 className={ css.title }>
                    <NotificationTitle type={ type }/>
                </h3>
            </div>
            { children }
        </header>
    );
});