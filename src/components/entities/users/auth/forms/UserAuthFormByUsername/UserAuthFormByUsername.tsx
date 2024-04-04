import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { User } from '@/components/entities/users/model/types/user.ts';
import css from './UserAuthFormByUsername.module.scss';


export type UserAuthFormByUsernameProps = {
    onSuccess?: (user: User) => void;
    onError?: (reason: string) => void;
    onSend?: (login: string, password: string) => Promise<User>;
};

const UserAuthFormByUsername: React.FC<UserAuthFormByUsernameProps> = (props) => {
    const { onError, onSuccess, onSend } = props;
    const { t }                          = useTranslation();

    const onSendCallback = function () {
        if (onSend) {
            onSend('', '')
                .then(onSuccess)
                .catch(onError);
        }
    };

    return (
        <div className={ css.container }>
            <h3>{ t('user_auth_form_enter_button') }</h3>
            <input placeholder="login" type="text"/>
            <input placeholder="password" type="text"/>
            <Button
                onClick={ onSendCallback }>{ t('user_auth_form_enter_button') }</Button>
        </div>
    );
};

export default React.memo(UserAuthFormByUsername);