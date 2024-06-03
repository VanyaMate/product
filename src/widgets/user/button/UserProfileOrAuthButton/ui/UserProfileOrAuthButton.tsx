import { FC, memo, useDeferredValue } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    UserHeaderControlMenu,
} from '@/widgets/user/menu/UserHeaderControlMenu/ui/UserHeaderControlMenu.tsx';
import {
    OpenUserAuthFormButton,
} from '@/widgets/user/button/OpenUserAuthFormButton/ui/OpenUserAuthFormButton.tsx';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';


export const UserProfileOrAuthButton: FC = memo(function UserProfileOrAuthButton () {
    const userData = useDeferredValue(useAppSelector(getAuthUser));

    return userData
           ? <UserHeaderControlMenu/>
           : <OpenUserAuthFormButton/>;
});