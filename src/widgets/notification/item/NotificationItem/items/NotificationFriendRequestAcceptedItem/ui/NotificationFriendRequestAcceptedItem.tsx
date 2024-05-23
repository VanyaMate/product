import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationFriendRequestAcceptedItem.module.scss';
import {
    DomainNotification
} from 'product-types/dist/notification/DomainNotification';


export type NotificationFriendRequestAcceptedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationFriendRequestAcceptedItem: FC<NotificationFriendRequestAcceptedItemProps> = memo(function NotificationFriendRequestAcceptedItem (props) {
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