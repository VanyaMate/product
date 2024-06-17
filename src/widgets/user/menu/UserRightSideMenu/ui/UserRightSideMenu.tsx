import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserRightSideMenu.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';
import {
    GlobalNotifications,
} from '@/widgets/notification/GlobalNotifications/ui/GlobalNotifications.tsx';
import { UserHeader } from '@/entities/user/UserHeader/ui/UserHeader.tsx';
import {
    UserControlMenu,
} from '@/widgets/user/menu/UserControlMenu/ui/UserControlMenu.tsx';


export type UserRightSideMenuProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserRightSideMenu: FC<UserRightSideMenuProps> = memo(function UserRightSideMenu (props) {
    const { className, ...other } = props;
    const userData                = useAppSelector(getAuthUser);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <UserHeader user={ userData }/>
            <UserControlMenu/>
            <GlobalNotifications/>
        </section>
    );
});