import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserPreviewItem.module.scss';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { useTranslation } from 'react-i18next';
import { FakeAvatar } from '@/shared/ui-kit/icons/FakeAvatar/ui/FakeAvatar.tsx';


export type UserPreviewItemProps =
    {
        user: DomainUser;
    }
    & ComponentPropsWithoutRef<'article'>;

export const UserPreviewItem: FC<UserPreviewItemProps> = memo(function ProfilePreviewItem (props) {
    const { className, user, children, ...other } = props;
    const { t }                                   = useTranslation();

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Link
                aria-label={ t('go_to_user_page_of', {
                    login: user.login,
                }) }
                className={ css.link }
                to={ `/user/${ user.login }` }
            >
                {
                    user.avatar
                    ? <Image
                        alt=""
                        className={ css.avatar }
                        src={ user.avatar }
                    />
                    : <FakeAvatar
                        className={ css.avatar }
                        letter={ user.login[0] }
                    />
                }
                <p>{ user.login }</p>
            </Link>
            {
                children
            }
        </article>
    );
});