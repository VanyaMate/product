import { FC, memo } from 'react';
import {
    UserAuthFormByUserNameFormType,
    UserAuthFormByUsernameWithError,
} from '@/entities/users';
import { useForm, useInputWithError } from '@/shared/ui-kit';
import { useDispatch } from 'react-redux';
import {
    authByUsername,
    ThunkDispatchType, User,
    userAuthLoginValidator,
    userAuthPasswordValidator,
} from '@/app';


export type UserAuthFormWithUsernameByJsonServer = {
    onSuccess?: (user: User) => void;
    onError?: (error: Error) => void;
}

export const UserAuthFormWithUsernameByJsonServer: FC<UserAuthFormWithUsernameByJsonServer> = memo(function UserAuthFormWithUsernameByJsonServer (props) {
    const { onError, onSuccess }      = props;
    const dispatch: ThunkDispatchType = useDispatch();
    const loginInputController        = useInputWithError({
        name            : 'username',
        validationMethod: userAuthLoginValidator,
        debounce        : 500,
    });
    const passwordInputController     = useInputWithError({
        name            : 'password',
        validationMethod: userAuthPasswordValidator,
        debounce        : 500,
    });
    const form                        = useForm<UserAuthFormByUserNameFormType>({
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
        <UserAuthFormByUsernameWithError
            formController={ form }
            loginController={ loginInputController }
            passwordController={ passwordInputController }
        />
    );
});