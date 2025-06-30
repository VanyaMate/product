import { FC, memo } from 'react';
import { AiOutlineLoading, AiOutlineLogin } from 'react-icons/ai';
import css from './SignInFormByLoginRHF.module.scss';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import {
    ReactHookFormHandlerSubmit,
} from '@/app/react-hook-form/types/form.ts';
import {
    DomainLoginData,
} from 'product-types/dist/authorization/DomainLoginData';
import { RhfErrors } from '@/app/react-hook-form/types/error.ts';
import { Checkbox } from '@/shared/ui-kit/input/Checkbox/ui/Checkbox.tsx';


export type SignInFormByLoginRHFProps = {
    loginController: UseFormRegisterReturn<'login'>;
    passwordController: UseFormRegisterReturn<'password'>;
    rememberController: UseFormRegisterReturn<'remember'>;
    formSubmit: ReturnType<ReactHookFormHandlerSubmit<DomainLoginData>>;
    errors: RhfErrors<DomainLoginData>,
    pending: boolean;
    canBeSubmitted: boolean;
};

export const SignInFormByLoginRHF: FC<SignInFormByLoginRHFProps> = memo(function SignInFormByLoginRHF (props) {
    const {
              loginController,
              passwordController,
              rememberController,
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
                autoComplete="off"
                errorMessage={ errors.password?.message }
                label={ t.app.user_auth_form_password_label }
                required
                type="password"
                { ...passwordController }
            />
            <Checkbox
                label={ t.app.user_auth_form_remember_label } { ...rememberController }/>
            <ButtonWithFixes
                disabled={ !canBeSubmitted || pending }
                post={
                    pending
                    ? <AiOutlineLoading className="loading"/>
                    : <AiOutlineLogin/>
                }
                type="submit"
            >
                { t.app.user_auth_form_enter_button }
            </ButtonWithFixes>
        </form>
    );
});