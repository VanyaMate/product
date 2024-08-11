import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserSettingsSection.module.scss';


export type UserSettingsSectionProps =
    {
        title: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const UserSettingsSection: FC<UserSettingsSectionProps> = memo(function UserSettingsSection (props) {
    const { title, className, children, ...other } = props;

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h3 className={ css.title }>{ title }</h3>
            { children }
        </section>
    );
});