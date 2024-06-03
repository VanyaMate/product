import { FC, memo, useDeferredValue } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import css from './UserHeaderControlMenu.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    UserProfileLink,
} from '@/entities/user/link/UserProfileLink/ui/UserProfileLink.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { getRouteUrl } from '@/app/routes/lib/getRouteUrl.ts';
import {
    SiteAppRoute,
    SiteAppRoutePath,
} from '@/app/routes/main-site/config/routes.tsx';
import { logout } from '@/app/redux/slices/auth/thunks/logout/logout.ts';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';


export type UserHeaderProfileButtonProps = {};

export const UserHeaderControlMenu: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderControlMenu () {
    const { t }    = useTranslation();
    const userData = useDeferredValue(useAppSelector(getAuthUser));
    const dispatch = useAppDispatch();

    return (
        <div className={ css.container }>
            <UserProfileLink
                login={ userData.login }
                to={
                    getRouteUrl(SiteAppRoutePath[SiteAppRoute.USER], {
                        login: userData.login,
                    })
                }
            />
            <Button
                aria-label={ t('logout_button') }
                onClick={ () => dispatch(logout()) }
                quad
                styleType={ ButtonStyleType.GHOST }
            >
                <AiOutlineLogout/>
            </Button>
        </div>
    );
});