import { FC, memo } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import css from './UserProfileLink.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';


export type UserProfileLinkProps =
    {
        username: string;
        to: string;
    };

export const UserProfileLink: FC<UserProfileLinkProps> = memo(function UserProfileLink (props) {
    const { username, to, ...other } = props;
    const { t }                      = useTranslation();

    return (
        <div { ...other } className={ css.container }>
            <AiOutlineUser/>
            <Link aria-label={ t('go_to_user_page_of', { username: username }) } to={ to }>
                { username }
            </Link>
        </div>
    );
});