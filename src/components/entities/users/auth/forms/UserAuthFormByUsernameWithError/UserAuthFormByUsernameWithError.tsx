import React from 'react';
import InputWithError
    from '@/components/shared/ui/inputs/InputWithError/InputWithError.tsx';
import ButtonWithFixes
    from '@/components/shared/ui/buttons/ButtonWithFixes/ButtonWithFixes.tsx';
import css from './UserAuthFormByUsernameWithError.module.scss';
import {
    useInputWithError,
} from '@/components/shared/ui/inputs/InputWithError/hooks/useInputWithError.ts';
import Form from '@/components/shared/ui/forms/Form.tsx';
import { useForm } from '@/components/shared/ui/forms/hooks/useForm.ts';
import { AiOutlineLoading, AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';


export type UserAuthFormByUsernameWithErrorProps = {};

const UserAuthFormByUsernameWithError: React.FC<UserAuthFormByUsernameWithErrorProps> = (props) => {
    const {}                      = props;
    const { t }                   = useTranslation([ 'translation', 'validation-messages' ]);
    const loginInputController    = useInputWithError({
        name            : 'login',
        validationMethod: (value) => {
            if (value.length < 5) {
                return t('min_length_error', { length: '5', ns: 'validation-messages' });
            } else {
                return '';
            }
        },
        debounce        : 500,
    });
    const passwordInputController = useInputWithError({
        name            : 'password',
        validationMethod: (value) => {
            if (value.length < 10) {
                return t('min_length_error', { length: '10', ns: 'validation-messages' });
            } else {
                return '';
            }
        },
        debounce        : 500,
    });
    const form                    = useForm<{ login: string, password: string }>({
        inputs  : [ loginInputController, passwordInputController ],
        onSubmit: (data) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    console.log(data);
                    resolve();
                }, 1000);
            });
        },
    });

    console.log('rerender form', loginInputController.errorMessage, loginInputController.isValid);

    return (
        <Form
            className={ css.container }
            controller={ form }
        >
            <InputWithError
                controller={ loginInputController }
                label={ t('user_auth_form_login_label') }
                required
            />
            <InputWithError
                controller={ passwordInputController }
                label={ t('user_auth_form_password_label') }
                required
                type="password"
            />
            <ButtonWithFixes
                disabled={ form.pending }
                post={
                    form.pending ? <AiOutlineLoading className="loading"/> :
                    <AiOutlineUser/>
                }
                type="submit"
            >
                { t('user_auth_form_enter_button') }
            </ButtonWithFixes>
        </Form>
    );
};

export default React.memo(UserAuthFormByUsernameWithError);