import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserControlMenu.module.scss';
import {
    UserSettingsLink,
} from '@/features/user/link/UserSettingsLink/ui/UserSettingsLink.tsx';
import {
    UserMuteNotificationsButton,
} from '@/features/user/button/UserMuteNotificationsButton/ui/UserMuteNotificationsButton.tsx';


export type UserControlMenuProps =
    {}
    & ComponentPropsWithoutRef<'ul'>;

export const UserControlMenu: FC<UserControlMenuProps> = memo(function UserControlMenu (props) {
    const { className, ...other } = props;

    return (
        <ul
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <li>
                <UserMuteNotificationsButton/>
            </li>
            <li>
                <UserSettingsLink/>
            </li>
        </ul>
    );
});