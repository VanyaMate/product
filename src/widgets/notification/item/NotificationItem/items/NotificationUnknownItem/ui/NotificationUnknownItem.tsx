import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUnknownItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationUnknownItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUnknownItem: FC<NotificationUnknownItemProps> = memo(function NotificationUnknownItem (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            // 123
        </div>
    );
});