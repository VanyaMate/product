import { FC, memo, useDeferredValue } from 'react';
import css from './UserHeaderControlMenu.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';
import {
    UserPreviewItem,
} from '@/entities/user/item/UserPreviewItem/ui/UserPreviewItem.tsx';
import {
    useGlobalStoreUpdaterByNotifications,
} from '@/features/notification/hooks/useGlobalStoreUpdaterByNotifications.ts';


export type UserHeaderProfileButtonProps = {};

export const UserHeaderControlMenu: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderControlMenu () {
    const userData = useDeferredValue(useAppSelector(getAuthUser));

    // Временно тут
    useGlobalStoreUpdaterByNotifications();

    return (
        <div className={ css.container }>
            <UserPreviewItem user={ userData }/>
        </div>
    );
});