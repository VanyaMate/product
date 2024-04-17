import { FC, memo, useDeferredValue } from 'react';
import {
    SiteAppRoute,
    SiteAppRoutePath,
    getRouteUrl,
    useAppSelector,
    getUserData, useAppDispatch, userActions,
} from '@/app';
import { Button, ButtonStyleType } from '@/shared/ui-kit';
import { AiOutlineLogout } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import css from './UserHeaderControlMenu.module.scss';
import { UserProfileLink } from '@/entities/user';


export type UserHeaderProfileButtonProps = {};

export const UserHeaderControlMenu: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderControlMenu () {
    const { t }    = useTranslation();
    const userData = useDeferredValue(useAppSelector(getUserData));
    const dispatch = useAppDispatch();

    return (
        <div className={ css.container }>
            <UserProfileLink
                to={
                    getRouteUrl(SiteAppRoutePath[SiteAppRoute.PROFILE], {
                        username: userData.username,
                    })
                }
                username={ userData.username }
            />
            <Button
                aria-label={ t('logout_button') }
                onClick={ () => dispatch(userActions.removeAuthData()) }
                quad
                styleType={ ButtonStyleType.GHOST }
            >
                <AiOutlineLogout/>
            </Button>
        </div>
    );
});