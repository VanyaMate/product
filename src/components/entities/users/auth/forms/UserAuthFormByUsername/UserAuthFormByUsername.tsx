import React, { FormEvent, FormEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/components/entities/users/model/types/user.ts';
import css from './UserAuthFormByUsername.module.scss';
import ButtonWithFixes
    from '@/components/shared/ui/buttons/ButtonWithFixes/ButtonWithFixes.tsx';
import Input from '@/components/shared/ui/inputs/Input/Input';
import {
    useInput,
} from '@/components/shared/ui/inputs/Input/hooks/useInput.ts';
import {
    AiOutlineLoading, AiOutlineUser,
} from 'react-icons/ai';
import NotificationMessage
    , {
    NotificationMessageType,
} from '@/components/shared/ui/notifications/NotificationMessage/NotificationMessage.tsx';
import {
    useInputCompose,
} from '@/components/shared/ui/inputs/Input/hooks/useInputCompose.ts';


export type UserAuthFormByUsernameProps = {
    onSuccess?: (user: User) => void;
    onError?: (reason: string) => void;
    onSend?: (login: string, password: string, remember?: boolean) => Promise<User>;
};

const UserAuthFormByUsername: React.FC<UserAuthFormByUsernameProps> = (props) => {
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
};

export default React.memo(UserAuthFormByUsername);