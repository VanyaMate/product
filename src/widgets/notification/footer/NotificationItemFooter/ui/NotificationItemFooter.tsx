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
        viewed: boolean;
        creationTime: string;
    }
    & ComponentPropsWithoutRef<'footer'>;

export const NotificationItemFooter: FC<NotificationItemFooterProps> = memo(function NotificationItemFooter (props) {
    const { className, viewed, creationTime, ...other } = props;

    return (
        <footer
            className={ classNames(css.container, {}, [ className ]) }
            { ...other }
        >
            <p className={ css.time }>{ getStringDeltaByDates(getDeltaByDates(creationTime, Date.now())) }</p>
            <p className={ css.viewed }>{ viewed.toString() }</p>
        </footer>
    );
});