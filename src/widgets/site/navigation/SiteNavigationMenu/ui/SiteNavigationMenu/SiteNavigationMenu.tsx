import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './SiteNavigationMenu.module.scss';
import {
    SiteNavigationLink,
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationLink/SiteNavigationLink.tsx';
import { LinkStyleType } from '@/shared/ui-kit';
import {
    IoDesktop,
    IoHome,
    IoLogoVk,
} from 'react-icons/io5';
import { IoLogoGithub } from 'react-icons/io';
import { SiteAppRoute, SiteAppRoutePath } from '@/app';
import { useTranslation } from 'react-i18next';


export type SiteNavigationMenuProps =
    {
        onCompleteAction?: () => void;
    }
    & ComponentPropsWithoutRef<'div'>;

export const SiteNavigationMenu: FC<SiteNavigationMenuProps> = memo(function SiteNavigationMenu (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'site-app', 'contacts' ]);

    return (
        <div { ...other } className={ classNames(css.container, {}, [ className ]) }>
            <nav className={ css.navigation }>
                <ul className={ css.list }>
                    <SiteNavigationLink
                        icon={ <IoHome/> }
                        styleType={ LinkStyleType.PRIMARY }
                        to={ SiteAppRoutePath[SiteAppRoute.HOME] }
                    >
                        { t('home_page') }
                    </SiteNavigationLink>
                    <SiteNavigationLink
                        icon={ <IoDesktop/> }
                        styleType={ LinkStyleType.PRIMARY }
                        to={ SiteAppRoutePath[SiteAppRoute.ABOUT] }
                    >
                        { t('about_us_page') }
                    </SiteNavigationLink>
                </ul>
            </nav>
            <footer className={ css.navigation }>
                <ul className={ css.list }>
                    <SiteNavigationLink
                        aria-label={ t('github', { ns: 'contacts' }) }
                        icon={ <IoLogoGithub/> }
                        styleType={ LinkStyleType.GHOST }
                        target="_blank"
                        to="https://github.com/VanyaMate/product"
                    >
                        { t('github', { ns: 'contacts' }) }
                    </SiteNavigationLink>
                    <SiteNavigationLink
                        aria-label={ t('vk') }
                        icon={ <IoLogoVk/> }
                        styleType={ LinkStyleType.GHOST }
                        target="_blank"
                        to="https://vk.com/vanya_mate"
                    >
                        { t('vk', { ns: 'contacts' }) }
                    </SiteNavigationLink>
                </ul>
            </footer>
        </div>
    );
});