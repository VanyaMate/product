import { FC, memo } from 'react';
import css from './SiteLogoLinkTitle.module.scss';
import { Link, LinkProps } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';


export type SiteLogoLinkTitleProps =
    {}
    & Omit<LinkProps, 'to'>;

export const SiteLogoLinkTitle: FC<SiteLogoLinkTitleProps> = memo(function SiteLogoLinkTitle (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'site-app' ]);

    return (
        <Link
            aria-label={ t('aria_logo') }
            className={ classNames(css.container, {}, [ className ]) }
            to="/"
            { ...other }
        >
            { t('logo') }
        </Link>
    );
});