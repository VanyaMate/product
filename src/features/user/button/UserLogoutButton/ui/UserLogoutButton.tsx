import { FC, memo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { logout } from '@/app/redux/slices/auth/thunks/logout/logout.ts';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { AiOutlineLogout } from 'react-icons/ai';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import { useTranslation } from 'react-i18next';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


export type UserLogoutButtonProps =
    {}
    & ButtonProps

export const UserLogoutButton: FC<UserLogoutButtonProps> = memo(function UserLogoutButton (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();
    const dispatch                = useAppDispatch();

    return (
        <ButtonWithLoading
            { ...other }
            aria-label={ t('logout_button') }
            className={ className }
            onClick={ () => dispatch(logout()).unwrap() }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <AiOutlineLogout/>
        </ButtonWithLoading>
    );
});