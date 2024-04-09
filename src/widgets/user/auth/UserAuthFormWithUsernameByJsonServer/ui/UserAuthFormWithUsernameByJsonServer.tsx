import { User } from '@/global/types';
import { FC, memo } from 'react';
import {
    UserAuthFormByUserNameFormType,
    UserAuthFormByUsernameWithError,
} from '@/entities/users';


export type UserAuthFormByUsernameProps = {
    onSuccess: (user: User) => void;
    onError?: (reason: string) => void;
};

export const UserAuthFormWithUsernameByJsonServer: FC<UserAuthFormByUsernameProps> = memo((props) => {
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
});