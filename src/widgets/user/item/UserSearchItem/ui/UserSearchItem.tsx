import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserSearchItem.module.scss';
import {
    UserPreviewItem,
} from '@/entities/user/item/UserPreviewItem/ui/UserPreviewItem.tsx';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    CompositeAddFriendButton,
} from '@/features/friend/button/CompositeAddFriendButton/ui/CompositeAddFriendButton.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    GoToPrivateDialogue,
} from '@/features/private-dialogue/button/GoToPrivateDialogue/ui/GoToPrivateDialogue.tsx';
import {
    DomainUserPermissions,
} from 'product-types/dist/user/DomainUserPermissions';


export type UserSearchItemProps =
    {
        user: DomainUser;
        permissions: DomainUserPermissions;
    }
    & ComponentPropsWithoutRef<'article'>;

export const UserSearchItem: FC<UserSearchItemProps> = memo(function ProfileSearchItem (props) {
    const { className, user, permissions, ...other } = props;

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <UserPreviewItem showOnline user={ user }/>
            <Row>
                <GoToPrivateDialogue
                    permissions={ permissions.privateDialogue }
                    userId={ user.id }
                />
                <CompositeAddFriendButton userId={ user.id }/>
            </Row>
        </article>
    );
});