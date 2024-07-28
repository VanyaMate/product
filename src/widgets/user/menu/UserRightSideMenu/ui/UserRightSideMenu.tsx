import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserRightSideMenu.module.scss';
import {
    UserControlMenu,
} from '@/widgets/user/menu/UserControlMenu/ui/UserControlMenu.tsx';
import {
    GlobalNotificationsAsync,
} from '@/widgets/notification/GlobalNotifications/ui/GlobalNotifications.async.tsx';


export type UserRightSideMenuProps =
    {}
    & ComponentPropsWithoutRef<'section'>;

export const UserRightSideMenu: FC<UserRightSideMenuProps> = memo(function UserRightSideMenu (props) {
    const { className, ...other } = props;

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <UserControlMenu className={ css.buttons }/>
            <GlobalNotificationsAsync className={ css.notifications }/>
        </section>
    );
});