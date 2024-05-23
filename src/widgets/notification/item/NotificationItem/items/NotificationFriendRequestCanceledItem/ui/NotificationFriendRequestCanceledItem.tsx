import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationFriendRequestCanceledItem.module.scss';
import {
    DomainNotification
} from 'product-types/dist/notification/DomainNotification';


export type NotificationFriendRequestCanceledItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationFriendRequestCanceledItem: FC<NotificationFriendRequestCanceledItemProps> = memo(function NotificationFriendRequestCanceledItem (props) {
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