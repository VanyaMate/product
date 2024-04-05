import React from 'react';
import css from './HeaderNavBar.module.scss';
import ToggleThemeButton
    from '@/components/shared/ui/theme/ThemeContext/ui/ToggleThemeButton/ToggleThemeButton.tsx';
import Link from '@/components/shared/ui/links/Link/Link.tsx';
import { useTranslation } from 'react-i18next';
import ToggleLanguageButton
    from '@/components/shared/ui/i18n/ToggleLanguageButton/ToggleLanguageButton.tsx';
import classNames from 'classnames';
import UserLoginButton
    from '../../../features/user/login/UserLoginButton/UserLoginButton';


export type HeaderNavBarProps = {};

const HeaderNavBar: React.FC<HeaderNavBarProps> = (props) => {
    const {}    = props;
    const { t } = useTranslation([ 'site-app' ]);

    return (
        <header className={ css.container }>
            <h1>
                <Link aria-label={ t('aria_logo') } to="/">{ t('logo') }</Link>
            </h1>
            <div className={ css.side }>
                <nav>
                    <ul className={ classNames(css.links, {}, [ css.list ]) }>
                        <li>
                            <Link to="/">{ t('home_page') }</Link>
                        </li>
                        <li>
                            <Link to="/about">{ t('about_us_page') }</Link>
                        </li>
                    </ul>
                </nav>
                <ul className={ classNames(css.utils, {}, [ css.list ]) }>
                    <li>
                        <ToggleLanguageButton/>
                    </li>
                    <li>
                        <ToggleThemeButton/>
                    </li>
                    <li>
                        <UserLoginButton/>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default React.memo(HeaderNavBar);