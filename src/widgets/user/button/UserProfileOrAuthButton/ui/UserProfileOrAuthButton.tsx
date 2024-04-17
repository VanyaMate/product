import { FC, memo, useDeferredValue } from 'react';
import { getUserData, useAppSelector } from '@/app';
import { OpenUserAuthFormButton, UserHeaderControlMenu } from '@/widgets/user';


export const UserProfileOrAuthButton: FC = memo(function UserProfileOrAuthButton () {
    const userData = useDeferredValue(useAppSelector(getUserData));

    return userData
           ? <UserHeaderControlMenu/>
           : <OpenUserAuthFormButton/>;
});