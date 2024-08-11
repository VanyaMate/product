import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserSettingsNoSetBackground.module.scss';
import { useTranslation } from 'react-i18next';


export type UserSettingsNoSetBackgroundProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserSettingsNoSetBackground: FC<UserSettingsNoSetBackgroundProps> = memo(function UserSettingsNoSetBackground (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'user-settings' ]);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t('no_background') }
        </div>
    );
});