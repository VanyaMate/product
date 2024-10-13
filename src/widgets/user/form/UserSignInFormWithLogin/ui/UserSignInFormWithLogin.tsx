import { FC, memo } from 'react';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { loginEffect } from '@/app/model/auth/auth.model.ts';
import {
    DomainLoginData,
} from 'product-types/dist/authorization/DomainLoginData';
import { useForm } from 'react-hook-form';
import {
    SignInFormByLoginRHF,
} from '@/entities/react-hook-form/auth/form/SignInFormByLoginRHF/ui/SignInFormByLoginRHF.tsx';
import {
    isPasswordValidatorRhf,
} from '@/app/react-hook-form/validator/isPasswordValidatorRhf/isPasswordValidatorRhf.ts';
import {
    isLoginValidatorRhf,
} from '@/app/react-hook-form/validator/isLoginValidatorRhf/isLoginValidatorRhf.ts';


export type UserSignInFormWithLoginProps = {
    onSuccess?: (user: DomainUser) => void;
    onError?: (error: Error) => void;
}

export const UserSignInFormWithLogin: FC<UserSignInFormWithLoginProps> = memo(function UserSignInFormWithLogin (props) {
    const { onError, onSuccess } = props;
    const {
              register,
              handleSubmit,
              formState,
          }                      = useForm<DomainLoginData>({
        mode: 'onChange',
    });
    const signInHandler          = (loginData: DomainLoginData) => {
        return loginEffect(loginData)
            .then((data) => onSuccess?.(data.user))
            .catch(onError);
    };

    return (
        <SignInFormByLoginRHF
            canBeSubmitted={ formState.isValid }
            errors={ formState.errors }
            formSubmit={ handleSubmit(signInHandler) }
            loginController={ register('login', {
                required: true,
                validate: isLoginValidatorRhf,
            }) }
            passwordController={ register('password', {
                required: true,
                validate: isPasswordValidatorRhf,
            }) }
            pending={ formState.isSubmitting }
            rememberController={ register('remember') }
        />
    );
});