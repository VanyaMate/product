import { FC, memo } from 'react';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import {
    registrationEffect,
} from '@/app/model/auth/auth.model.ts';
import {
    SignUpFormByLoginRHF,
} from '@/entities/react-hook-form/auth/form/SignUpFormByLoginRHF/ui/SignUpFormByLoginRHF.tsx';
import {
    DomainRegistrationData,
} from 'product-types/dist/authorization/DomainRegistrationData';
import { useForm } from 'react-hook-form';
import {
    isLoginValidatorRhf,
} from '@/app/react-hook-form/validator/isLoginValidatorRhf/isLoginValidatorRhf.ts';
import {
    isPasswordValidatorRhf,
} from '@/app/react-hook-form/validator/isPasswordValidatorRhf/isPasswordValidatorRhf.ts';
import {
    isEmailValidatorRhf,
} from '@/app/react-hook-form/validator/isEmailValidatorRhf/isEmailValidatorRhf.ts';


export type UserSignUpFormWithLoginEmailProps = {
    onSuccess?: (user: DomainUser) => void;
    onError?: (error: Error) => void;
}

export const UserSignUpFormWithLoginEmail: FC<UserSignUpFormWithLoginEmailProps> = memo(function UserSignUpFormWithLoginEmail (props) {
    const { onError, onSuccess } = props;
    const {
              register,
              handleSubmit,
              formState,
          }                      = useForm<DomainRegistrationData>({
        mode: 'onChange',
    });

    const signUpHandler = (registrationData: DomainRegistrationData) => {
        return registrationEffect(registrationData)
            .then((data) => onSuccess?.(data.user))
            .catch(onError);
    };

    return (
        <SignUpFormByLoginRHF
            canBeSubmitted={ formState.isValid }
            emailController={ register('email', {
                required: true,
                validate: isEmailValidatorRhf,
            }) }
            errors={ formState.errors }
            formSubmit={ handleSubmit(signUpHandler) }
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