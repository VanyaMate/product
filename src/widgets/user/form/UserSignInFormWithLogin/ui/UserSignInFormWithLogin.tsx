import { FC, memo } from 'react';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    AuthFormByUserNameFormType,
} from '@/entities/auth/form/AuthFormByUsernameWithError/types/types.ts';
import {
    userAuthLoginValidator,
} from '@/app/validation/user/login.validators.ts';
import {
    AuthFormByUsernameWithError,
} from '@/entities/auth/form/AuthFormByUsernameWithError/ui/AuthFormByUsernameWithError.tsx';
import {
    userAuthPasswordValidator,
} from '@/app/validation/user/password.validators.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { loginEffect } from '@/app/model/auth/auth.model.ts';


export type UserSignInFormWithLoginProps = {
    onSuccess?: (user: DomainUser) => void;
    onError?: (error: Error) => void;
}

export const UserSignInFormWithLogin: FC<UserSignInFormWithLoginProps> = memo(function UserSignInFormWithLogin (props) {
    const { onError, onSuccess }  = props;
    const loginInputController    = useInputWithError({
        name            : 'login',
        validationMethod: userAuthLoginValidator,
        debounce        : 500,
    });
    const passwordInputController = useInputWithError({
        name            : 'password',
        validationMethod: userAuthPasswordValidator,
        debounce        : 500,
    });
    const form                    = useForm<AuthFormByUserNameFormType>({
        inputs  : [ loginInputController, passwordInputController ],
        onSubmit: async (authData) => {
            return loginEffect({ ...authData, remember: true })
                .then((data) => onSuccess?.(data.user))
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