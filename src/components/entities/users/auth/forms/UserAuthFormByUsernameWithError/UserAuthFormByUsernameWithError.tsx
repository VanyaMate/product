import React from 'react';
import InputWithError
    from '@/components/shared/ui/inputs/InputWithError/InputWithError.tsx';
import ButtonWithFixes
    from '@/components/shared/ui/buttons/ButtonWithFixes/ButtonWithFixes.tsx';
import css from './UserAuthFormByUsernameWithError.module.scss';


export type UserAuthFormByUsernameWithErrorProps = {};

const UserAuthFormByUsernameWithError: React.FC<UserAuthFormByUsernameWithErrorProps> = (props) => {
    const {} = props;

    return (
        <div className={ css.container }>
            <InputWithError
                label={ 'Логин' }
            />
            <ButtonWithFixes>Войти</ButtonWithFixes>
        </div>
    );
};

export default React.memo(UserAuthFormByUsernameWithError);