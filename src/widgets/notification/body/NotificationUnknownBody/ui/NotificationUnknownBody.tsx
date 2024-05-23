import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUnknownBody.module.scss';


export type NotificationUnknownBodyProps =
    {
        data: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUnknownBody: FC<NotificationUnknownBodyProps> = memo(function NotificationUnknownBody (props) {
    const { className, data, ...other } = props;

    return (
        <p
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { data }
        </p>
    );
});