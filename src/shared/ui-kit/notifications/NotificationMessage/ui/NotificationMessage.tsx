import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationMessage.module.scss';
import { NotificationMessageType } from '../types';


export type NotificationMessageProps =
    {
        styleType?: NotificationMessageType;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationMessage: FC<NotificationMessageProps> = memo(function NotificationMessage (props) {
    const { styleType, className, ...other } = props;

    return (
        <div { ...other }
             className={
                 classNames(css.container, {}, [
                     className, styleType ? css[styleType] : false,
                 ])
             }
        />
    );
});