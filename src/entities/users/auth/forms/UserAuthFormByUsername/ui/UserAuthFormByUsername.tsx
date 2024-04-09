import { FC, FormEvent, FormEventHandler, memo, useState } from 'react';
import { User } from '@/global/types';
import { useTranslation } from 'react-i18next';
import {
    ButtonWithFixes,
    Input,
    NotificationMessage,
    NotificationMessageType,
    useInput,
    useInputCompose,
} from '@/shared/ui-kit';
import { AiOutlineLoading, AiOutlineUser } from 'react-icons/ai';
import css from './UserAuthFormByUsername.module.scss';


export type UserAuthFormByUsernameProps = {
    onSuccess?: (user: User) => void;
    onError?: (reason: string) => void;
    onSend?: (login: string, password: string, remember?: boolean) => Promise<User>;
};

export const UserAuthFormByUsername: FC<UserAuthFormByUsernameProps> = memo(function UserAuthFormByUsername (props) {
    const { onError, onSuccess, onSend } = props;
    const { t }                          = useTranslation([ 'translation', 'validation-messages' ]);
    const [ loading, setLoading ]        = useState<boolean>(false);
    const loginInput                     = useInput({
        validationMethod: (login) =>
            (login.length > 5)
            ? '' : t('min_length_error', { ns: 'validation-messages' }),
        debounce        : 500,
    });
    const passwordInput                  = useInput();
    const form                           = useInputCompose(loginInput, passwordInput);

    const onSubmitHandler: FormEventHandler = function (event: FormEvent) {
        event.preventDefault();
        if (onSend && form.valid) {
            setLoading(true);
            onSend(loginInput.getValue(), passwordInput.getValue())
                .then(onSuccess)
                .catch(onError)
                .finally(() => setLoading(false));
        } else if (!form.valid) {
            form.getNextError();
        }
    };

    return (
        <form className={ css.container } onSubmit={ onSubmitHandler }>
            <h3>{ t('user_auth_form_enter_button') }</h3>
            {
                form.nextError
                ? <NotificationMessage styleType={ NotificationMessageType.DANGER }>
                    { form.nextError }
                </NotificationMessage>
                : null
            }
            <Input
                controller={ loginInput }
                label={ t('user_auth_form_login_label') }
                required
                type="text"
            />
            <Input
                controller={ passwordInput }
                label={ t('user_auth_form_password_label') }
                required
                type="password"
            />
            <ButtonWithFixes
                disabled={ loading }
                post={
                    loading
                    ? <AiOutlineLoading className="loading"/>
                    : <AiOutlineUser/>
                }
                type="submit"
            >
                {
                    form.valid
                    ? t('user_auth_form_enter_button')
                    : 'Перейти к полю c ошибкой'
                }
            </ButtonWithFixes>
        </form>
    );
});