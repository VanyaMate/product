import { FC, memo, useEffect } from 'react';
import { useForm, useInputWithError } from '@/shared/ui-kit';
import { useDispatch } from 'react-redux';
import {
    GlobalStoreThunk, User,
    userAuthLoginValidator,
    userAuthPasswordValidator,
} from '@/app';
import {
    type AuthFormByUserNameFormType,
    AuthFormByUsernameWithError,
} from '@/entities/auth';
import { useStoreWithManager } from '@/app/redux/hooks/useStoreWithManager.ts';
import { authByUsername } from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { authReducer } from '@/app/redux/slices/auth/slice/auth.slice.ts';


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
    const store                      = useStoreWithManager();

    useEffect(() => {
        store.reducerManager.add('auth', authReducer);
        return () => store.reducerManager.remove('auth');
        // eslint-disable-next-line
    }, []);

    return (
        <AuthFormByUsernameWithError
            formController={ form }
            loginController={ loginInputController }
            passwordController={ passwordInputController }
        />
    );
});