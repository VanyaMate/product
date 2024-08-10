import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMoreNotifications.module.scss';
import { useTranslation } from 'react-i18next';


export type NoMoreNotificationsProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMoreNotifications: FC<NoMoreNotificationsProps> = memo(function NoMoreNotifications (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'notifications' ]);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t('no_more_notifications') }
        </div>
    );
});