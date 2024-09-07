import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMoreNotifications.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NoMoreNotificationsProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMoreNotifications: FC<NoMoreNotificationsProps> = memo(function NoMoreNotifications (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t.notifications.helpers.no_more_notifications }
        </div>
    );
});