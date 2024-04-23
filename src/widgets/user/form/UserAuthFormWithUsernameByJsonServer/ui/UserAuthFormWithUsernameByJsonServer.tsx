import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { authByUsername } from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { authReducer } from '@/app/redux/slices/auth/slice/authSlice.ts';
import { useReducerConnector } from '@/app/redux/hooks/useReducerConnector.ts';
import { GlobalStoreThunk } from '@/app/redux/types/global-store-thunk.ts';
import {
    useInputWithError
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    AuthFormByUserNameFormType
} from '@/entities/auth/form/AuthFormByUsernameWithError/types/types.ts';
import { userAuthLoginValidator } from '@/app/validation/user/login.validators.ts';
import {
    AuthFormByUsernameWithError
} from '@/entities/auth/form/AuthFormByUsernameWithError/ui/AuthFormByUsernameWithError.tsx';
import { userAuthPasswordValidator } from '@/app/validation/user/password.validators.ts';
import { DomainUser } from 'product-types';


export type UserAuthFormWithUsernameByJsonServer = {
    onSuccess?: (user: DomainUser) => void;
    onError?: (error: Error) => void;
}

export const UserAuthFormWithUsernameByJsonServer: FC<UserAuthFormWithUsernameByJsonServer> = memo(function UserAuthFormWithUsernameByJsonServer (props) {
    const { onError, onSuccess }     = props;
    const dispatch: GlobalStoreThunk = useDispatch();
    const loginInputController       = useInputWithError({
        name            : 'login',
        validationMethod: userAuthLoginValidator,
        debounce        : 500,
    });
    const passwordInputController    = useInputWithError({
        name            : 'password',
        validationMethod: userAuthPasswordValidator,
        debounce        : 500,
    });
    const form                       = useForm<AuthFormByUserNameFormType>({
        inputs  : [ loginInputController, passwordInputController ],
        onSubmit: async (authData) => {
            return dispatch(authByUsername(authData))
                .unwrap()
                .then(onSuccess)
                .catch(onError);
        },
    });

    useReducerConnector('auth', authReducer);

    return (
        <AuthFormByUsernameWithError
            formController={ form }
            loginController={ loginInputController }
            passwordController={ passwordInputController }
        />
    );
});