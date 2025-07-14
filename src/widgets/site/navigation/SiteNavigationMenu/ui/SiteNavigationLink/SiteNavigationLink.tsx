import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import css from './SiteNavigationLink.module.scss';
import { Link, LinkProps } from '@/shared/ui-kit/links/Link/ui/Link.tsx';


export type SiteNavigationLinkProps =
    {
        icon: ReactNode;
    }
    & LinkProps;

export const SiteNavigationLink: FC<SiteNavigationLinkProps> = memo(function SiteNavigationLink (props) {
    const { className, icon, children, styleType, ...other } = props;

    return (
        <Link
            { ...other }
            className={ classNames(css.container, {}, [ className, css[styleType] ]) }
            styleType={ styleType }
        >
                <span
                    className={ css.icon }>
                    { icon }
                </span>
            <span className={ css.children }>{ children }</span>
        </Link>
    );
});