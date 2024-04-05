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


export type UserAuthFormByUsernameProps = {
    onSuccess?: (user: User) => void;
    onError?: (reason: string) => void;
    onSend?: (login: string, password: string, remember?: boolean) => Promise<User>;
};

const UserAuthFormByUsername: React.FC<UserAuthFormByUsernameProps> = (props) => {
    const { onError, onSuccess, onSend } = props;
    const { t }                          = useTranslation();
    const [ loading, setLoading ]        = useState<boolean>(false);
    const loginLengthErrorMessage        = t('login_length_error_message');
    const loginInput                     = useInput({
        validationMethod: (login) => (login.length > 5) ? '' : loginLengthErrorMessage,
    });
    const passwordInput                  = useInput();

    const onSubmitHandler: FormEventHandler = function (event: FormEvent) {
        if (onSend && loginInput.valid && passwordInput.valid) {
            event.preventDefault();
            setLoading(true);
            onSend(loginInput.getValue(), passwordInput.getValue())
                .then(onSuccess)
                .catch(onError)
                .finally(() => setLoading(false));
        }
    };

    return (
        <form className={ css.container } onSubmit={ onSubmitHandler }>
            <h3>{ t('user_auth_form_enter_button') }</h3>
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
                disabled={ loading || !loginInput.valid || !passwordInput.valid }
                post={
                    loading
                    ? <AiOutlineLoading className="loading"/>
                    : <AiOutlineUser/>
                }
                type="submit"
            >
                { t('user_auth_form_enter_button') }
            </ButtonWithFixes>
        </form>
    );
};

export default React.memo(UserAuthFormByUsername);