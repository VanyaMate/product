import { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import css from './SiteNavigationLink.module.scss';
import { Link, LinkProps } from '@/shared/ui-kit';


export type SiteNavigationLinkProps =
    {
        icon: ReactNode;
    }
    & LinkProps;

export const SiteNavigationLink: FC<SiteNavigationLinkProps> = memo(function SiteNavigationLink (props) {
    const { className, icon, children, styleType, ...other } = props;

    return (
        <li>
            <Link
                { ...other }
                className={ classNames(css.container, {}, [ className ]) }
                styleType={ styleType }
            >
                <span className={ classNames(css.icon, {}, [ css[styleType] ]) }>
                    { icon }
                </span>
                <span>{ children }</span>
            </Link>
        </li>
    );
});