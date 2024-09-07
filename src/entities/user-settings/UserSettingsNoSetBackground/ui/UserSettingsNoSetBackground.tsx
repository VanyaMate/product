import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserSettingsNoSetBackground.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UserSettingsNoSetBackgroundProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserSettingsNoSetBackground: FC<UserSettingsNoSetBackgroundProps> = memo(function UserSettingsNoSetBackground (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            { t.page.userSettings.no_background }
        </div>
    );
});