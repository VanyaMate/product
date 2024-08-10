import { FC, memo } from 'react';
import {
    OpenUserAuthFormButton,
} from '@/widgets/user/button/OpenUserAuthFormButton/ui/OpenUserAuthFormButton.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import {
    UserHeaderControlMenu,
} from '@/widgets/user/menu/UserHeaderControlMenu/ui/UserHeaderControlMenu.tsx';


export const UserProfileOrAuthButton: FC = memo(function UserProfileOrAuthButton () {
    const userData = useStore($authUser);

    return userData
           ? <UserHeaderControlMenu/>
           : <OpenUserAuthFormButton/>;
});