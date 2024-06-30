import { FC, memo } from 'react';
import css from './UserHeaderControlMenu.module.scss';
import {
    UserPreviewItem,
} from '@/entities/user/item/UserPreviewItem/ui/UserPreviewItem.tsx';
import { useStore } from '@vanyamate/sec-react';
import { authUser } from '@/app/model/auth/auth.model.ts';


export type UserHeaderProfileButtonProps = {};

export const UserHeaderControlMenu: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderControlMenu () {
    const userData = useStore(authUser);

    return (
        <div className={ css.container }>
            <UserPreviewItem user={ userData }/>
        </div>
    );
});