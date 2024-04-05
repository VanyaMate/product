import React from 'react';
import classNames from 'classnames';
import css from './NotificationMessage.module.scss';


export enum NotificationMessageType {
    PRIMARY = 'primary',
    SECOND  = 'second',
    GHOST   = 'ghost',
    DANGER  = 'danger'
}

export type NotificationMessageProps =
    {
        styleType?: NotificationMessageType;
    }
    & React.ComponentPropsWithoutRef<'div'>;

const NotificationMessage: React.FC<NotificationMessageProps> = (props) => {
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
};

export default React.memo(NotificationMessage);