import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '@/app';
import { UserAuthButton } from '@/widgets/user';
import { UserHeaderProfileButton } from '@/entities/users/profile';


export const UserHeaderProfileMenuControl: FC = memo(function UserHeaderProfileMenuControl () {
    const userData = useSelector(getUserData);

    // Просто защита
    if (!userData) {
        return <UserAuthButton/>;
    }

    return (
        <UserHeaderProfileButton
            onClick={ () => {
                console.log('Open dropdown menu');
            } }
            user={ userData }
        />
    );
});