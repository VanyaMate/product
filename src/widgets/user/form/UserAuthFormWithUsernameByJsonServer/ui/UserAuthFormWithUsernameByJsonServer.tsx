import { FC, memo } from 'react';
import { useForm, useInputWithError } from '@/shared/ui-kit';
import { useDispatch } from 'react-redux';
import {
    authByUsername,
    GlobalStoreThunk, User,
    userAuthLoginValidator,
    userAuthPasswordValidator,
} from '@/app';
import {
    type AuthFormByUserNameFormType,
    AuthFormByUsernameWithError,
} from '@/entities/auth';


export type UserAuthFormWithUsernameByJsonServer = {
    onSuccess?: (user: User) => void;
    onError?: (error: Error) => void;
}

export const UserAuthFormWithUsernameByJsonServer: FC<UserAuthFormWithUsernameByJsonServer> = memo(function UserAuthFormWithUsernameByJsonServer (props) {
    const { onError, onSuccess }     = props;
    const dispatch: GlobalStoreThunk = useDispatch();
    const loginInputController       = useInputWithError({
        name            : 'username',
        validationMethod: userAuthLoginValidator,
        debounce        : 500,
    });
    const passwordInputController     = useInputWithError({
        name            : 'password',
        validationMethod: userAuthPasswordValidator,
        debounce        : 500,
    });
    const form                        = useForm<AuthFormByUserNameFormType>({
        inputs  : [ loginInputController, passwordInputController ],
        onSubmit: async (authData) => {
            return dispatch(authByUsername(authData))
                .unwrap()
                .then((user) => {
                    console.log('after dispatch');
                    onSuccess?.(user);
                })
                .catch(onError);
        },
    });

    return (
        <AuthFormByUsernameWithError
            formController={ form }
            loginController={ loginInputController }
            passwordController={ passwordInputController }
        />
    );
});