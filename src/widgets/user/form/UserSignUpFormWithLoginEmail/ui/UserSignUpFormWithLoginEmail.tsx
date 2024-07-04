import { FC, memo } from 'react';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    userAuthLoginValidator,
} from '@/app/validation/user/login.validators.ts';
import {
    userAuthPasswordValidator,
} from '@/app/validation/user/password.validators.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    registrationEffect,
} from '@/app/model/auth/auth.model.ts';
import { emailValidator } from '@/app/validation/user/email.validator.ts';
import { useTranslation } from 'react-i18next';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';
import { AiOutlineLoading, AiOutlineLogin } from 'react-icons/ai';
import css from './UserSignUpFormWithLoginEmail.module.scss';


type UserSignUpFormData = {
    login: string;
    password: string;
    email: string;
}

export type UserSignUpFormWithLoginEmailProps = {
    onSuccess?: (user: DomainUser) => void;
    onError?: (error: Error) => void;
}

export const UserSignUpFormWithLoginEmail: FC<UserSignUpFormWithLoginEmailProps> = memo(function UserSignUpFormWithLoginEmail (props) {
    const { onError, onSuccess } = props;
    const { t }                  = useTranslation([ 'translation' ]);

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
    const emailInputController    = useInputWithError({
        name            : 'email',
        validationMethod: emailValidator,
        debounce        : 500,
    });
    const form                    = useForm<UserSignUpFormData>({
        inputs  : [ loginInputController, passwordInputController, emailInputController ],
        onSubmit: async (authData) => {
            return registrationEffect({ ...authData, remember: true })
                .then((data) => onSuccess(data.user))
                .catch(onError);
        },
    });

    return (
        <Form
            className={ css.container }
            controller={ form }
        >
            <InputWithError
                autoComplete="off"
                controller={ loginInputController }
                label={ t('user_auth_form_login_label') }
                required
            />
            <InputWithError
                autoComplete="new-password"
                controller={ passwordInputController }
                label={ t('user_auth_form_password_label') }
                required
                type="password"
            />
            <InputWithError
                controller={ emailInputController }
                label={ t('user_auth_form_email_label') }
                required
                type="email"
            />
            <ButtonWithFixes
                disabled={ !form.canBeSubmitted || form.pending }
                post={
                    form.pending
                    ? <AiOutlineLoading className="loading"/>
                    : <AiOutlineLogin/>
                }
                type="submit"
            >
                { t('user_registration_form_enter_button') }
            </ButtonWithFixes>
        </Form>
    );
});