import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './SiteNavigationMenu.module.scss';
import {
    SiteNavigationLink,
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationLink/SiteNavigationLink.tsx';
import {
    IoDesktop,
    IoDocuments,
    IoHome, IoLanguage, IoList,
    IoLogoVk,
    IoMail,
    IoPeople,
} from 'react-icons/io5';
import { IoLogoGithub } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import {
    useSiteMainLayoutSideMenu,
} from '@/shared/layout/site/SiteMainLayout/hooks/useSiteMainLayoutSideMenu.tsx';
import { LinkStyleType } from '@/shared/ui-kit/links/Link/types/types.ts';
import {
    SiteAppRoute,
    SiteAppRoutePath,
} from '@/app/routes/main-site/config/routes.tsx';
import { isRouteOf } from '@/app/routes/lib/isRouteOf.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type SiteNavigationMenuProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const SiteNavigationMenu: FC<SiteNavigationMenuProps> = memo(function SiteNavigationMenu (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();
    const { pathname }            = useLocation();
    const { onCompleteAction }    = useSiteMainLayoutSideMenu();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <nav className={ css.navigation }>
                <ul className={ css.list }>
                    <li>
                        <SiteNavigationLink
                            icon={ <IoHome/> }
                            onClick={ onCompleteAction }
                            styleType={
                                isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.HOME])
                                ? LinkStyleType.PRIMARY
                                : LinkStyleType.GHOST
                            }
                            to={ SiteAppRoutePath[SiteAppRoute.HOME] }
                        >
                            { t.app.home_page }
                        </SiteNavigationLink>
                    </li>
                    <li>
                        <SiteNavigationLink
                            icon={ <IoPeople/> }
                            onClick={ onCompleteAction }
                            styleType={
                                isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.FRIENDS])
                                ? LinkStyleType.PRIMARY
                                : LinkStyleType.GHOST
                            }
                            to={ SiteAppRoutePath[SiteAppRoute.FRIENDS] }
                        >
                            { t.app.friends_page }
                        </SiteNavigationLink>
                    </li>
                    <li>
                        <SiteNavigationLink
                            icon={ <IoMail/> }
                            onClick={ onCompleteAction }
                            styleType={
                                isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.DIALOGUES]) ||
                                isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.DIALOGUE])
                                ? LinkStyleType.PRIMARY
                                : LinkStyleType.GHOST
                            }
                            to={ SiteAppRoutePath[SiteAppRoute.DIALOGUES] }
                        >
                            { t.app.dialogues_page }
                        </SiteNavigationLink>
                    </li>
                    <SiteNavigationLink
                        icon={ <IoDocuments/> }
                        onClick={ onCompleteAction }
                        styleType={
                            isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.FILES]) ||
                            isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.FILE])
                            ? LinkStyleType.PRIMARY
                            : LinkStyleType.GHOST
                        }
                        to={ SiteAppRoutePath[SiteAppRoute.FILES] }
                    >
                        { t.app.files_page }
                    </SiteNavigationLink>
                    <li>
                        <SiteNavigationLink
                            icon={ <IoLanguage/> }
                            onClick={ onCompleteAction }
                            styleType={
                                isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.LANGUAGES])
                                ? LinkStyleType.PRIMARY
                                : LinkStyleType.GHOST
                            }
                            to={ SiteAppRoutePath[SiteAppRoute.LANGUAGES] }
                        >
                            { t.app.languages_page }
                        </SiteNavigationLink>
                    </li>
                    <li>
                        <SiteNavigationLink
                            icon={ <IoDesktop/> }
                            onClick={ onCompleteAction }
                            styleType={
                                isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.ABOUT])
                                ? LinkStyleType.PRIMARY
                                : LinkStyleType.GHOST
                            }
                            to={ SiteAppRoutePath[SiteAppRoute.ABOUT] }
                        >
                            { t.app.about_us_page }
                        </SiteNavigationLink>
                    </li>

                    <li>
                        <SiteNavigationLink
                            icon={ <IoList/> }
                            onClick={ onCompleteAction }
                            styleType={
                                isRouteOf(pathname, SiteAppRoutePath[SiteAppRoute.EXCEL_SPLITTER])
                                ? LinkStyleType.PRIMARY
                                : LinkStyleType.GHOST
                            }
                            to={ SiteAppRoutePath[SiteAppRoute.EXCEL_SPLITTER] }
                        >
                            { t.app.excel_splitter_page }
                        </SiteNavigationLink>
                    </li>
                </ul>
            </nav>
            <footer className={ css.navigation }>
                <ul className={ css.list }>
                    <li>
                        <SiteNavigationLink
                            aria-label={ t.contacts.github }
                            icon={ <IoLogoGithub/> }
                            styleType={ LinkStyleType.GHOST }
                            target="_blank"
                            to="https://github.com/VanyaMate/product"
                        >
                            { t.contacts.github }
                        </SiteNavigationLink>
                    </li>
                    <li>
                        <SiteNavigationLink
                            aria-label={ t.contacts.vk }
                            icon={ <IoLogoVk/> }
                            styleType={ LinkStyleType.GHOST }
                            target="_blank"
                            to="https://vk.com/vanya_mate"
                        >
                            { t.contacts.vk }
                        </SiteNavigationLink>
                    </li>
                </ul>
            </footer>
        </div>
    );
});