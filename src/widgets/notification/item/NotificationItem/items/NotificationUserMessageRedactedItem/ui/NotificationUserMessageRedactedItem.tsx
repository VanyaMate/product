import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUserMessageRedactedItem.module.scss';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationUserMessageRedactedItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUserMessageRedactedItem: FC<NotificationUserMessageRedactedItemProps> = memo(function NotificationUserMessageRedactedItem (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            {/* eslint-disable-next-line i18next/no-literal-string */ }
            { }
            // message redacted
        </div>
    );
});