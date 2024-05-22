import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationShortBodyError.module.scss';
import {
    DomainNotificationErrorData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationErrorData';


export type NotificationShortBodyErrorProps =
    {
        data: DomainNotificationErrorData;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationShortBodyError: FC<NotificationShortBodyErrorProps> = memo(function NotificationShortBodyError (props) {
    const { className, data, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { data.error.message[0] }
        </div>
    );
});