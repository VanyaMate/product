import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserSearchItem.module.scss';
import {
    UserPreviewItem,
} from '@/entities/user/item/UserPreviewItem/ui/UserPreviewItem.tsx';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    AddToFriendButton,
} from '@/features/friend/button/AddToFriendButton/ui/AddToFriendButton.tsx';


export type UserSearchItemProps =
    {
        user: DomainUser;
    }
    & ComponentPropsWithoutRef<'article'>;

export const UserSearchItem: FC<UserSearchItemProps> = memo(function ProfileSearchItem (props) {
    const { className, user, ...other } = props;

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <UserPreviewItem user={ user }/>
            <AddToFriendButton userId={ user.id }/>
        </article>
    );
});