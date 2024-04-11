import { FC, memo, useDeferredValue } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, User, userActions } from '@/app';
import { OpenUserAuthFormButton } from '@/widgets/user';
import { UserHeaderProfileButton } from '@/entities/users/profile';


export const UserHeaderProfileMenuControl: FC = memo(function UserHeaderProfileMenuControl () {
    const userData = useSelector(getUserData);
    const user     = useDeferredValue<User | null>(userData);
    // TEMP
    const dispatch = useDispatch();

    return user
           ? <UserHeaderProfileButton
               onClick={ () => dispatch(userActions.removeAuthData()) }
               user={ user }
           />
           : <OpenUserAuthFormButton/>;
});