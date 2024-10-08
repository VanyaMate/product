import { FC, memo } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import css from './UserProfileLink.module.scss';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type ToUserPageLinkProps =
    {
        login: string;
        to: string;
    };

export const UserProfileLink: FC<ToUserPageLinkProps> = memo(function UserProfileLink (props) {
    const { login, to, ...other } = props;
    const { t, replace }          = useTranslation();

    return (
        <div { ...other } className={ css.container }>
            <AiOutlineUser/>
            <Link
                aria-label={ replace(t.app.go_to_user_page_of, { login }) }
                to={ to }
            >
                { login }
            </Link>
        </div>
    );
});