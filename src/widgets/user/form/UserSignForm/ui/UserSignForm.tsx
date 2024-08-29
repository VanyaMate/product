import { ComponentPropsWithoutRef, FC, memo, useState } from 'react';
import classNames from 'classnames';
import css from './UserSignForm.module.scss';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    UserSignInFormWithLogin,
} from '@/widgets/user/form/UserSignInFormWithLogin/ui/UserSignInFormWithLogin.tsx';
import {
    UserSignUpFormWithLoginEmail,
} from '@/widgets/user/form/UserSignUpFormWithLoginEmail/ui/UserSignUpFormWithLoginEmail.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UserSignFormProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserSignForm: FC<UserSignFormProps> = memo(function UserSignForm (props) {
    const { className, ...other } = props;
    const [ type, setType ]       = useState<'sign-in' | 'sign-up'>('sign-in');
    const { t }                   = useTranslation();

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div className={ css.control }>
                <Button
                    onClick={ () => setType('sign-in') }
                    styleType={ type === 'sign-in' ? ButtonStyleType.PRIMARY
                                                   : ButtonStyleType.GHOST }
                >
                    { t.app.user_form_sign_in }
                </Button>
                <Button
                    onClick={ () => setType('sign-up') }
                    styleType={ type === 'sign-up' ? ButtonStyleType.PRIMARY
                                                   : ButtonStyleType.GHOST }
                >
                    { t.app.user_form_sign_up }
                </Button>
            </div>
            {
                type === 'sign-in'
                ? <UserSignInFormWithLogin/>
                : <UserSignUpFormWithLoginEmail/>
            }
        </div>
    );
});