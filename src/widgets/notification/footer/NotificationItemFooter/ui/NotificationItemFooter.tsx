import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationItemFooter.module.scss';
import {
    getStringDeltaByDates,
} from '@vanyamate/helpers/date/getStringDeltaByDates/getStringDeltaByDates.ts';
import {
    getDeltaByDates,
} from '@vanyamate/helpers/date/getDeltaByDates/getDeltaByDates.ts';


export type NotificationItemFooterProps =
    {
        creationTime: number;
    }
    & ComponentPropsWithoutRef<'footer'>;

export const NotificationItemFooter: FC<NotificationItemFooterProps> = memo(function NotificationItemFooter (props) {
    const { className, creationTime, children, ...other } = props;

    return (
        <footer
            className={ classNames(css.container, {}, [ className ]) }
            { ...other }
        >
            { children }
            <p className={ css.time }>{ getStringDeltaByDates(getDeltaByDates(creationTime, Date.now())) }</p>
        </footer>
    );
});