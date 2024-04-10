import { FC, memo } from 'react';
import {
    UserAuthFormByUserNameFormType,
    UserAuthFormByUsernameWithError,
} from '@/entities/users';
import { useForm, useInputWithError } from '@/shared/ui-kit';
import { useDispatch } from 'react-redux';
import {
    authByUsername,
    ThunkDispatchType,
    userAuthLoginValidator,
    userAuthPasswordValidator,
} from '@/app';


export const UserAuthFormWithUsernameByJsonServer: FC = memo(function UserAuthFormWithUsernameByJsonServer () {
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
            return dispatch(authByUsername(authData)).unwrap().then();
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