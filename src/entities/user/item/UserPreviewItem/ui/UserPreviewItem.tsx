import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserPreviewItem.module.scss';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    UserAvatar,
    UserAvatarSize,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { getUserPageUrl } from '@/features/routes/lib/getUserPageUrl.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';


export type UserPreviewItemProps =
    {
        user: DomainUser;
        showOnline?: boolean;
    }
    & ComponentPropsWithoutRef<'article'>;

export const UserPreviewItem: FC<UserPreviewItemProps> = memo(function ProfilePreviewItem (props) {
    const {
              className,
              user,
              children,
              showOnline,
              ...other
          }              = props;
    const { t, replace } = useTranslation();

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Link
                aria-label={ replace(t.app.go_to_user_page_of, {
                    login: user.login,
                }) }
                className={ css.link }
                to={ getUserPageUrl(user.login) }
            >
                <UserAvatar
                    avatar={ user.avatar }
                    login={ user.login }
                    online={ showOnline ? user.online : undefined }
                    size={ UserAvatarSize.MEDIUM }
                />
                <p>{ user.login }</p>
            </Link>
            {
                children
            }
        </article>
    );
});