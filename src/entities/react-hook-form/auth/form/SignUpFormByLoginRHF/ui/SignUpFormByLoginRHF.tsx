import { FC, memo } from 'react';
import { AiOutlineLoading, AiOutlineLogin } from 'react-icons/ai';
import css from './SignUpFormByLoginRHF.module.scss';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
    ReactHookFormHandlerSubmit,
} from '@/app/react-hook-form/types/form.ts';
import { RhfErrors } from '@/app/react-hook-form/types/error.ts';
import {
    DomainRegistrationData,
} from 'product-types/dist/authorization/DomainRegistrationData';
import { Checkbox } from '@/shared/ui-kit/input/Checkbox/ui/Checkbox.tsx';


export type SignUpFormByLoginRHFProps = {
    loginController: UseFormRegisterReturn<'login'>;
    passwordController: UseFormRegisterReturn<'password'>;
    emailController: UseFormRegisterReturn<'email'>;
    rememberController: UseFormRegisterReturn<'remember'>;
    formSubmit: ReturnType<ReactHookFormHandlerSubmit<DomainRegistrationData>>;
    errors: RhfErrors<DomainRegistrationData>,
    pending: boolean;
    canBeSubmitted: boolean;
};

export const SignUpFormByLoginRHF: FC<SignUpFormByLoginRHFProps> = memo(function SignUpFormByLoginRHF (props) {
    const {
              loginController,
              passwordController,
              rememberController,
              emailController,
              formSubmit,
              pending,
              canBeSubmitted,
              errors,
          }     = props;
    const { t } = useTranslation();

    return (
        <form
            className={ css.container }
            onSubmit={ formSubmit }
        >
            <TextInput
                autoComplete="off"
                errorMessage={ errors.login?.message }
                label={ t.app.user_auth_form_login_label }
                required
                type="text"
                { ...loginController }
            />
            <TextInput
                autoComplete="new-password"
                errorMessage={ errors.password?.message }
                label={ t.app.user_auth_form_password_label }
                required
                type="password"
                { ...passwordController }
            />
            <TextInput
                autoComplete="off"
                errorMessage={ errors.email?.message }
                label={ t.app.user_auth_form_email_label }
                required
                type="email"
                { ...emailController }
            />
            <Checkbox label="Запомнить меня" { ...rememberController }/>
            <ButtonWithFixes
                disabled={ !canBeSubmitted || pending }
                post={
                    pending
                    ? <AiOutlineLoading className="loading"/>
                    : <AiOutlineLogin/>
                }
                type="submit"
            >
                { t.app.user_registration_form_enter_button }
            </ButtonWithFixes>
        </form>
    );
});