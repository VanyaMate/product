import { FC, memo } from 'react';
import { SiteAppRoute, SiteAppRoutePath, User } from '@/app';
import { ButtonStyleType, ButtonWithFixes, Link } from '@/shared/ui-kit';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import css from './UserHeaderProfileButton.module.scss';
import { getUrl } from '@/app/routes/lib/getUrl.ts';


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
                to={ getUrl(SiteAppRoutePath[SiteAppRoute.PROFILE], { username: user.username }) }>
                { user.username }
            </Link>
            <ButtonWithFixes
                onClick={ () => onClick(user) }
                post={
                    <AiOutlineLogout/>
                }
                styleType={ ButtonStyleType.GHOST }
            >
                { t('logout_button') }
            </ButtonWithFixes>
        </div>
    );
});