import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserHeaderDropdownMenu.module.scss';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $authUser, logoutEffect } from '@/app/model/auth/auth.model.ts';
import {
    Divider,
    DividerType,
} from '@/shared/ui-kit/divider/Divider/ui/Divider.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { IoLogOut, IoSettings } from 'react-icons/io5';
import { LinkStyleType } from '@/shared/ui-kit/links/Link/types/types.ts';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useTranslation } from 'react-i18next';
import {
    SiteNavigationLink,
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationLink/SiteNavigationLink.tsx';


export type UserHeaderDropdownMenuProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserHeaderDropdownMenu: FC<UserHeaderDropdownMenuProps> = memo(function UserHeaderDropdownMenu (props) {
    const { className, ...other } = props;
    const userData                = useStore($authUser);
    const { t }                   = useTranslation();

    return (
        <Col
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <UserAvatar
                avatar={ userData.avatar }
                className={ css.avatar }
                login={ userData.login }
            />
            <Link to="/">{ userData.login }</Link>
            <Divider className={ css.divider } type={ DividerType.HORIZONTAL }/>
            <SiteNavigationLink
                className={ css.link }
                icon={ <IoSettings/> }
                styleType={ LinkStyleType.GHOST }
                to="/settings"
            >
                { t('user_settings_page') }
            </SiteNavigationLink>
            <Divider className={ css.divider } type={ DividerType.HORIZONTAL }/>
            <ButtonWithFixes
                className={ css.button }
                onClick={ logoutEffect }
                pref={ <IoLogOut/> }
                styleType={ ButtonStyleType.DANGER }
            >
                { t('logout_button') }
            </ButtonWithFixes>
        </Col>
    );
});