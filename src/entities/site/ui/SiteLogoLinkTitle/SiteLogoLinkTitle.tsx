import { FC, memo } from 'react';
import css from './SiteLogoLinkTitle.module.scss';
import { Link, LinkProps } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import classNames from 'classnames';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { getRouteUrl } from '@/app/routes/lib/getRouteUrl.ts';
import {
    SiteAppRoute,
    SiteAppRoutePath,
} from '@/app/routes/main-site/config/routes.tsx';


export type SiteLogoLinkTitleProps =
    {}
    & Omit<LinkProps, 'to'>;

export const SiteLogoLinkTitle: FC<SiteLogoLinkTitleProps> = memo(function SiteLogoLinkTitle (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <Link
            aria-label={ t.app.logo }
            className={ classNames(css.container, {}, [ className ]) }
            to={ getRouteUrl(SiteAppRoutePath[SiteAppRoute.HOME]) }
            { ...other }
        >
            { t.app.logo }
        </Link>
    );
});