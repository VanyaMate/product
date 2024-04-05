import React from 'react';
import { User } from '@/components/entities/users/model/types/user.ts';
import UserAuthFormByUsername
    from '@/components/entities/users/auth/forms/UserAuthFormByUsername/UserAuthFormByUsername.tsx';
import UserAuthFormByUsernameWithError
    from '@/components/entities/users/auth/forms/UserAuthFormByUsernameWithError/UserAuthFormByUsernameWithError.tsx';


export type UserAuthFormByUsernameProps = {
    onSuccess?: (user: User) => void;
    onError?: (reason: string) => void;
};

const UserAuthFormWithUsernameByJsonServer: React.FC<UserAuthFormByUsernameProps> = (props) => {
    const { onError, onSuccess } = props;

    return (
        <UserAuthFormByUsernameWithError/>
    );
};

export default React.memo(UserAuthFormWithUsernameByJsonServer);