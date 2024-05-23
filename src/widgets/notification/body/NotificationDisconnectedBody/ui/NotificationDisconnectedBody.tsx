import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationDisconnectedBody.module.scss';
import {
    DomainNotificationDisconnectedData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationDisconnectedData';


export type NotificationDisconnectedBodyProps =
    {
        data: DomainNotificationDisconnectedData;
    }
    & ComponentPropsWithoutRef<'p'>;

export const NotificationDisconnectedBody: FC<NotificationDisconnectedBodyProps> = memo(function NotificationDisconnectedBody (props) {
    const { className, data, ...other } = props;

    return (
        <p
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { data.reason }
        </p>
    );
});