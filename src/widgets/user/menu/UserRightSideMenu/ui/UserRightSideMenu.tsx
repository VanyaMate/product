import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserRightSideMenu.module.scss';
import { UserHeader } from '@/entities/user/UserHeader/ui/UserHeader.tsx';
import {
    UserControlMenu,
} from '@/widgets/user/menu/UserControlMenu/ui/UserControlMenu.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';


export type UserRightSideMenuProps =
    {}
    & ComponentPropsWithoutRef<'section'>;

export const UserRightSideMenu: FC<UserRightSideMenuProps> = memo(function UserRightSideMenu (props) {
    const { className, ...other } = props;
    const userData                = useStore($authUser);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <UserHeader user={ userData }/>
            <UserControlMenu/>
        </section>
    );
});