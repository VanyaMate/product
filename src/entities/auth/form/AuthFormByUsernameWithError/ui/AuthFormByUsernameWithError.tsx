import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineLoading, AiOutlineLogin } from 'react-icons/ai';
import css from './AuthFormByUsernameWithError.module.scss';
import {
    IUseInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { IUseForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';


export type AuthFormByUsernameWithErrorProps = {
    loginController: IUseInputWithError,
    passwordController: IUseInputWithError,
    formController: IUseForm
};

export const AuthFormByUsernameWithError: FC<AuthFormByUsernameWithErrorProps> = memo(function AuthFormByUsernameWithError (props) {
    const { loginController, passwordController, formController } = props;
    const { t }                                                   = useTranslation([ 'translation' ]);

    return (
        <Form
            className={ css.container }
            controller={ formController }
        >
            <InputWithError
                autoComplete="off"
                controller={ loginController }
                label={ t('user_auth_form_login_label') }
                required
            />
            <InputWithError
                autoComplete="new-password"
                controller={ passwordController }
                label={ t('user_auth_form_password_label') }
                required
                type="password"
            />
            <ButtonWithFixes
                disabled={ !formController.canBeSubmitted || formController.pending }
                post={
                    formController.pending
                    ? <AiOutlineLoading className="loading"/>
                    : <AiOutlineLogin/>
                }
                type="submit"
            >
                { t('user_auth_form_enter_button') }
            </ButtonWithFixes>
        </Form>
    );
});