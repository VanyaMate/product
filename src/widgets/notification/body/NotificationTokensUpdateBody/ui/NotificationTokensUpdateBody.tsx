import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationTokensUpdateBody.module.scss';
import {
    DomainNotificationTokensUpdateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationTokensUpdateData';


export type NotificationShortBodyTokensUpdateProps =
    {
        data: DomainNotificationTokensUpdateData;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationTokensUpdateBody: FC<NotificationShortBodyTokensUpdateProps> = memo(function NotificationShortBodyTokensUpdate (props) {
    const { className, data, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            {
                data.join('\n\n')
            }
        </div>
    );
});