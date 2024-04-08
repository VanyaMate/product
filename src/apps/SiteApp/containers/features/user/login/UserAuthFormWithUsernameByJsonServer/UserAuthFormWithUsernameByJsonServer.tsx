import React from 'react';
import { User } from '@/components/entities/users/model/types/user.ts';
import UserAuthFormByUsernameWithError
    , {
    UserAuthFormByUserNameFormType,
} from '@/components/entities/users/auth/forms/UserAuthFormByUsernameWithError/UserAuthFormByUsernameWithError.tsx';


export type UserAuthFormByUsernameProps = {
    onSuccess: (user: User) => void;
    onError?: (reason: string) => void;
};

const UserAuthFormWithUsernameByJsonServer: React.FC<UserAuthFormByUsernameProps> = (props) => {
    const { onSuccess, onError } = props;

    const loginHandler = function (userData: UserAuthFormByUserNameFormType) {
        return fetch('http://localhost:8000/login', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body   : JSON.stringify(userData),
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw (await response.json()).message;
                }
            })
            .then(onSuccess)
            .catch(onError);
    };

    const errorHandler = function (errorMessage: string) {
        onError && onError(errorMessage);
    };

    return (
        <UserAuthFormByUsernameWithError
            onError={ errorHandler }
            onSubmit={ loginHandler }
        />
    );
};

export default React.memo(UserAuthFormWithUsernameByJsonServer);