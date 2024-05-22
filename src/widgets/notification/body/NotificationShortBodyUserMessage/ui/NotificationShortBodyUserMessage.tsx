import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationShortBodyUserMessage.module.scss';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';


export type NotificationShortBodyUserMessageProps =
    {
        data: DomainNotificationUserMessageData;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationShortBodyUserMessage: FC<NotificationShortBodyUserMessageProps> = memo(function NotificationShortBodyUserMessage (props) {
    const { className, data, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <h4>{ data.message.author.login }</h4>
            <p>{ data.message.message }</p>
            <hr/>
            <p>{ data.message.creationDate }</p>
        </div>
    );
});