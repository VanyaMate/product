import { FC, memo } from 'react';
import { SiteAppRoute, SiteAppRoutePath, User, getRouteUrl } from '@/app';
import { Button, ButtonStyleType, Link } from '@/shared/ui-kit';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import css from './UserHeaderProfileButton.module.scss';


export type UserHeaderProfileButtonProps = {
    user: User;
    onClick: (user: User) => void;
};

export const UserHeaderProfileButton: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderProfileButton (props) {
    const { user, onClick } = props;
    const { t }             = useTranslation();

    return (
        <div className={ css.container }>
            <AiOutlineUser/>
            <Link
                to={ getRouteUrl(SiteAppRoutePath[SiteAppRoute.PROFILE], { username: user.username }) }>
                { user.username }
            </Link>
            <Button
                onClick={ () => onClick(user) }
                styleType={ ButtonStyleType.GHOST }
                aria-label={ t('logout_button') }
                quad
            >
                <AiOutlineLogout/>
            </Button>
        </div>
    );
});