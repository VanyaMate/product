import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useMemo,
} from 'react';
import classNames from 'classnames';
import css from './UserSettingsContainer.module.scss';
import {
    SiteNavigationLink,
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationLink/SiteNavigationLink.tsx';
import {
    IoColorPalette,
    IoNotifications,
    IoPerson,
    IoShield,
} from 'react-icons/io5';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { getRouteUrl } from '@/app/routes/lib/getRouteUrl.ts';
import {
    SITE_ROUTE_PARAM_SETTINGS_TYPE,
    SiteAppRoute,
    SiteAppRoutePath, SiteRouteSettingsType,
} from '@/app/routes/main-site/config/routes.tsx';
import { isRouteOf } from '@/app/routes/lib/isRouteOf.ts';
import { useLocation, useParams } from 'react-router-dom';
import { LinkStyleType } from '@/shared/ui-kit/links/Link/types/types.ts';
import {
    UserPrivacySettingsContainer,
} from '@/widgets/user-settings/container/UserPrivacySettingsContainer/ui/UserPrivacySettingsContainer.tsx';
import {
    UserNotificationsSettingsContainer,
} from '@/widgets/user-settings/container/UserNotificationsSettingsContainer/ui/UserNotificationsSettingsContainer.tsx';
import {
    UserCustomisationSettingsContainer,
} from '@/widgets/user-settings/container/UserCustomisationSettingsContainer/ui/UserCustomisationSettingsContainer.tsx';
import {
    UserProfileSettingsContainer,
} from '@/widgets/user-settings/container/UserProfileSettingsContainer/ui/UserProfileSettingsContainer.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UserSettingsContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserSettingsContainer: FC<UserSettingsContainerProps> = memo(function UserSettingsContainer (props) {
    const { className, ...other } = props;
    const { pathname }            = useLocation();
    const { t }                   = useTranslation();
    const params                  = useParams<{
        [SITE_ROUTE_PARAM_SETTINGS_TYPE]: SiteRouteSettingsType
    }>();

    const content = useMemo(() => {
        switch (params[SITE_ROUTE_PARAM_SETTINGS_TYPE]) {
            case SiteRouteSettingsType.SITE_ROUTE_SETTINGS_PRIVACY_TYPE:
                return <UserPrivacySettingsContainer/>;
            case SiteRouteSettingsType.SITE_ROUTE_SETTINGS_NOTIFICATIONS_TYPE:
                return <UserNotificationsSettingsContainer/>;
            case SiteRouteSettingsType.SITE_ROUTE_SETTINGS_CUSTOMISATION_TYPE:
                return <UserCustomisationSettingsContainer/>;
            default:
                return <UserProfileSettingsContainer/>;
        }
    }, [ params ]);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <Col className={ css.menu }>
                <SiteNavigationLink
                    icon={ <IoPerson/> }
                    styleType={
                        isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.SETTINGS], true)
                        ? LinkStyleType.PRIMARY : LinkStyleType.GHOST
                    }
                    to={ SiteAppRoutePath[SiteAppRoute.SETTINGS] }
                >
                    { t.page.userSettings.menu_profile_link }
                </SiteNavigationLink>
                <SiteNavigationLink
                    icon={ <IoShield/> }
                    styleType={
                        isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.SETTINGS_TYPE], true, [ SiteRouteSettingsType.SITE_ROUTE_SETTINGS_PRIVACY_TYPE ])
                        ? LinkStyleType.PRIMARY : LinkStyleType.GHOST
                    }
                    to={
                        getRouteUrl(SiteAppRoutePath[SiteAppRoute.SETTINGS_TYPE], {
                            [SITE_ROUTE_PARAM_SETTINGS_TYPE]: SiteRouteSettingsType.SITE_ROUTE_SETTINGS_PRIVACY_TYPE,
                        })
                    }
                >
                    { t.page.userSettings.menu_privacy_link }
                </SiteNavigationLink>
                <SiteNavigationLink
                    icon={ <IoNotifications/> }
                    styleType={
                        isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.SETTINGS_TYPE], true, [ SiteRouteSettingsType.SITE_ROUTE_SETTINGS_NOTIFICATIONS_TYPE ])
                        ? LinkStyleType.PRIMARY : LinkStyleType.GHOST
                    }
                    to={
                        getRouteUrl(SiteAppRoutePath[SiteAppRoute.SETTINGS_TYPE], {
                            [SITE_ROUTE_PARAM_SETTINGS_TYPE]: SiteRouteSettingsType.SITE_ROUTE_SETTINGS_NOTIFICATIONS_TYPE,
                        })
                    }
                >
                    { t.page.userSettings.menu_notifications_link }
                </SiteNavigationLink>
                <SiteNavigationLink
                    icon={ <IoColorPalette/> }
                    styleType={
                        isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.SETTINGS_TYPE], true, [ SiteRouteSettingsType.SITE_ROUTE_SETTINGS_CUSTOMISATION_TYPE ])
                        ? LinkStyleType.PRIMARY : LinkStyleType.GHOST
                    }
                    to={
                        getRouteUrl(SiteAppRoutePath[SiteAppRoute.SETTINGS_TYPE], {
                            [SITE_ROUTE_PARAM_SETTINGS_TYPE]: SiteRouteSettingsType.SITE_ROUTE_SETTINGS_CUSTOMISATION_TYPE,
                        })
                    }
                >
                    { t.page.userSettings.menu_customisation_link }
                </SiteNavigationLink>
            </Col>
            <div className={ css.content }>
                { content }
            </div>

            {/*            <Virtual
             className={ css.content }
             list={ [ content ] }
             render={ (e: ReactNode) => e }
             showAmount={ 1 }
             />*/ }
        </div>
    );
});