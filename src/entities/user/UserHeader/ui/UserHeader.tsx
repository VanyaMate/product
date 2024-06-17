import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserHeader.module.scss';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';


export type UserHeaderProps =
    {
        user: DomainUser;
    }
    & ComponentPropsWithoutRef<'div'>;

export const UserHeader: FC<UserHeaderProps> = memo(function UserHeader (props) {
    const { className, user, ...other } = props;

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <UserAvatar
                avatar={ user.avatar }
                className={ css.avatar }
                login={ user.login }
            />
            <h3 className={ css.login }>{ user.login }</h3>
        </section>
    );
});