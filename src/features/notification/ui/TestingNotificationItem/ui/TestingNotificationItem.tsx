import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './TestingNotificationItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export type TestingNotificationItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const TestingNotificationItem: FC<TestingNotificationItemProps> = memo(function TestingNotificationItem (props) {
    const { className, notification, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <h3>{ notification.type }</h3>
            <p>{ notification.data }</p>
            <p>{ notification.dateMs }</p>
        </div>
    );
});