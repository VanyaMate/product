import { FC, memo, useDeferredValue } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    OpenUserAuthFormButton,
} from '@/widgets/user/button/OpenUserAuthFormButton/ui/OpenUserAuthFormButton.tsx';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';
import {
    UserHeaderControlMenuAsync,
} from '@/widgets/user/menu/UserHeaderControlMenu/ui/UserHeaderControlMenu.async.tsx';


export const UserProfileOrAuthButton: FC = memo(function UserProfileOrAuthButton () {
    const userData = useDeferredValue(useAppSelector(getAuthUser));

    return userData
           ? <UserHeaderControlMenuAsync/>
           : <OpenUserAuthFormButton/>;
});