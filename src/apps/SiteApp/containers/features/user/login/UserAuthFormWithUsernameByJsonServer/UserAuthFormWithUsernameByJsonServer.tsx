import React from 'react';
import { User } from '@/components/entities/users/model/types/user.ts';
import UserAuthFormByUsername
    from '@/components/entities/users/auth/forms/UserAuthFormByUsername/UserAuthFormByUsername.tsx';


export type UserAuthFormByUsernameProps = {
    onSuccess?: (user: User) => void;
    onError?: (reason: string) => void;
};

const UserAuthFormWithUsernameByJsonServer: React.FC<UserAuthFormByUsernameProps> = (props) => {
    const { onError, onSuccess } = props;

    return (
        <UserAuthFormByUsername
            onError={ onError }
            onSend={ async (login) => {
                try {
                    return {
                        id      : '',
                        username: login,
                    };
                } catch (e) {
                    throw 'Error';
                }
            } }
            onSuccess={ onSuccess }
        />
    );
};

export default React.memo(UserAuthFormWithUsernameByJsonServer);