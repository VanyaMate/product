import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationFriendRequestItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationFriendRequestItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationFriendRequestItem: FC<NotificationFriendRequestItemProps> = memo(function NotificationFriendRequestItem (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            //
        </div>
    );
});