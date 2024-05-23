import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationFriendRequestBody.module.scss';
import {
    DomainNotificationFriendRequestData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationFriendRequestData';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { api } from '@/app/axios/lib/api.ts';


export type NotificationShortBodyFriendRequestProps =
    {
        data: DomainNotificationFriendRequestData;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationFriendRequestBody: FC<NotificationShortBodyFriendRequestProps> = memo(function NotificationShortBodyFriendRequest (props) {
    const { className, data, ...other } = props;

    // TODO: WIP
    const add = function () {
        api.post(`/v1/friend/accept/${ data.requestId }`);
    };

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <p>{ data.requestId }</p>
            <h4>{ data.user.login }</h4>
            <p>{ data.message }</p>
            <Button onClick={ add }>+</Button>
        </div>
    );
});