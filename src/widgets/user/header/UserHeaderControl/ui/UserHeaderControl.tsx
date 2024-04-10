import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '@/app';
import { UserAuthButton, UserHeaderProfileMenuControl } from '@/widgets/user';


export const UserHeaderControl: FC = memo(function UserHeaderControl () {
    const userData = useSelector(getUserData);
    return userData ? <UserHeaderProfileMenuControl/> : <UserAuthButton/>;
});