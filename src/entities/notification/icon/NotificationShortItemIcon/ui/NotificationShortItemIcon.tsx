import { FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationShortItemIcon.module.scss';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { IconBaseProps } from 'react-icons';
import {
    NotificationIconByType,
} from '@/entities/notification/icon/NotificationShortItemIcon/config/NotificationIconByType.config.ts';


export type NotificationShortItemIconProps =
    {
        type: DomainNotificationType;
    }
    & IconBaseProps;

export const NotificationShortItemIcon: FC<NotificationShortItemIconProps> = memo(function NotificationShortItemIcon (props) {
    const { className, type, ...other } = props;
    const Icon                          = NotificationIconByType[type].component;

    return (
        <Icon
            { ...other }
            className={ classNames(css.container, {}, [ className, NotificationIconByType[type].className ]) }
        />
    );
});