import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUserMessageDeletedItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationUserMessageDeletedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUserMessageDeletedItem: FC<NotificationUserMessageDeletedItemProps> = memo(function NotificationUserMessageDeletedItem (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            // message deleted
        </div>
    );
});