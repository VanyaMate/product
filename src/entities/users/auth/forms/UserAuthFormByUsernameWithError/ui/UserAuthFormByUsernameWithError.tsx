import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ButtonWithFixes,
    Form,
    InputWithError,
    useForm,
    useInputWithError,
} from '@/shared/ui-kit';
import { AiOutlineLoading, AiOutlineUser } from 'react-icons/ai';
import css from './UserAuthFormByUsernameWithError.module.scss';


export type UserAuthFormByUserNameFormType = {
    username: string;
    password: string;
    remember?: boolean;
}

export type UserAuthFormByUsernameWithErrorProps = {
    onSubmit: (data: UserAuthFormByUserNameFormType) => Promise<any>;
    onError?: (error: string) => void;
};

export const UserAuthFormByUsernameWithError: FC<UserAuthFormByUsernameWithErrorProps> = memo(function UserAuthFormByUsernameWithError (props) {
    const { onSubmit, onError }   = props;
    const { t }                   = useTranslation([ 'translation', 'validation-messages' ]);
    const loginInputController    = useInputWithError({
        name            : 'username',
        validationMethod: (value) => {
            if (value.length < 5) {
                return t('min_length_error', { length: '5', ns: 'validation-messages' });
            }
            return '';
        },
        debounce        : 500,
    });
    const passwordInputController = useInputWithError({
        name            : 'password',
        validationMethod: (value) => {
            if (value.length < 10) {
                return t('min_length_error', { length: '10', ns: 'validation-messages' });
            }
            return '';
        },
        debounce        : 500,
    });
    const form                    = useForm<UserAuthFormByUserNameFormType>({
        inputs  : [ loginInputController, passwordInputController ],
        onSubmit: onSubmit,
        onError : onError,
    });

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
                disabled={ !form.canBeSubmitted || form.pending }
                post={
                    form.pending
                    ? <AiOutlineLoading className="loading"/>
                    : <AiOutlineUser/>
                }
                type="submit"
            >
                { t('user_auth_form_enter_button') }
            </ButtonWithFixes>
        </Form>
    );
});