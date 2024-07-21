import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserPreviewItem.module.scss';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { useTranslation } from 'react-i18next';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';


export type UserPreviewItemProps =
    {
        user: DomainUser;
    }
    & ComponentPropsWithoutRef<'article'>;

export const UserPreviewItem: FC<UserPreviewItemProps> = memo(function ProfilePreviewItem (props) {
    const { className, user, children, ...other } = props;
    const { t }                                   = useTranslation([ 'translation' ]);

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Link
                aria-label={ t('go_to_user_page_of', {
                    ns   : 'translation',
                    login: user.login,
                }) }
                className={ css.link }
                to={ `/user/${ user.login }` }
            >
                <UserAvatar
                    avatar={ user.avatar }
                    className={ css.avatar }
                    login={ user.login }
                    online={ user.online }
                />
                <p>{ user.login }</p>
            </Link>
            {
                children
            }
        </article>
    );
});