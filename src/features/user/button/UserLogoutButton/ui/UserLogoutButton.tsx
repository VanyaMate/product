import { FC, memo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { AiOutlineLogout } from 'react-icons/ai';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { logoutEffect } from '@/app/model/auth/auth.model.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UserLogoutButtonProps =
    {}
    & ButtonProps

export const UserLogoutButton: FC<UserLogoutButtonProps> = memo(function UserLogoutButton (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <PopOver popover={ t.app.logout_button }>
            <ButtonWithLoading
                { ...other }
                aria-label={ t.app.logout_button }
                className={ className }
                onClick={ logoutEffect }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <AiOutlineLogout/>
            </ButtonWithLoading>
        </PopOver>
    );
});