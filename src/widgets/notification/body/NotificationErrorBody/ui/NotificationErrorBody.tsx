import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationErrorBody.module.scss';
import {
    DomainNotificationErrorData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationErrorData';


export type NotificationErrorBodyProps =
    {
        data: DomainNotificationErrorData;
    }
    & ComponentPropsWithoutRef<'p'>;

export const NotificationErrorBody: FC<NotificationErrorBodyProps> = memo(function NotificationShortBodyError (props) {
    const { className, data, ...other } = props;

    return (
        <p
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { data.error.message[0] }
        </p>
    );
});