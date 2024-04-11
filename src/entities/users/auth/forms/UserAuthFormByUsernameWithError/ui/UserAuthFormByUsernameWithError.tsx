import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ButtonWithFixes,
    Form,
    InputWithError, IUseForm, IUseInputWithError,
} from '@/shared/ui-kit';
import { AiOutlineLoading, AiOutlineLogin } from 'react-icons/ai';
import css from './UserAuthFormByUsernameWithError.module.scss';


export type UserAuthFormByUserNameFormType = {
    username: string;
    password: string;
}

export type UserAuthFormByUsernameWithErrorProps = {
    loginController: IUseInputWithError,
    passwordController: IUseInputWithError,
    formController: IUseForm
};

export const UserAuthFormByUsernameWithError: FC<UserAuthFormByUsernameWithErrorProps> = memo(function UserAuthFormByUsernameWithError (props) {
    const { loginController, passwordController, formController } = props;
    const { t }                                                   = useTranslation([ 'translation', 'validation-messages' ]);

    return (
        <Form
            className={ css.container }
            controller={ formController }
        >
            <InputWithError
                controller={ loginController }
                label={ t('user_auth_form_login_label') }
                required
            />
            <InputWithError
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