import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserHeader.module.scss';
import {
    UserAvatar, UserAvatarSize,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { DomainUser } from 'product-types/dist/user/DomainUser';


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
                login={ user.login }
                online={ user.online }
                size={ UserAvatarSize.LARGE }
            />
            <h3 className={ css.login }>{ user.login }</h3>
        </section>
    );
});