import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUserMessageReadItem.module.scss';
import {
    DomainNotification
} from 'product-types/dist/notification/DomainNotification';


export type NotificationUserMessageReadItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUserMessageReadItem: FC<NotificationUserMessageReadItemProps> = memo(function NotificationUserMessageReadItem (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            // message read
        </div>
    );
});