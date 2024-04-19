import { FC, memo, useDeferredValue } from 'react';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getUserData
} from '@/app/redux/slices/user/selectors/getUserData/getUserData.ts';
import {
    UserHeaderControlMenu
} from '@/widgets/user/menu/UserHeaderControlMenu/ui/UserHeaderControlMenu.tsx';
import {
    OpenUserAuthFormButton
} from '@/widgets/user/button/OpenUserAuthFormButton/ui/OpenUserAuthFormButton.tsx';


export const UserProfileOrAuthButton: FC = memo(function UserProfileOrAuthButton () {
    const userData = useDeferredValue(useAppSelector(getUserData));

    return userData
           ? <UserHeaderControlMenu/>
           : <OpenUserAuthFormButton/>;
});