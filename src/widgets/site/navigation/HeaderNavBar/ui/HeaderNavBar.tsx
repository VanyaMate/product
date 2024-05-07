import { FC, memo } from 'react';
import css from './HeaderNavBar.module.scss';
import classNames from 'classnames';
import {
    ToggleLanguageButton,
} from '@/features/i18n/button/ToggleLanguageButton/ui/ToggleLanguageButton.tsx';
import {
    ToggleThemeButton,
} from '@/features/theme/button/ToggleThemeButton/ui/ToggleThemeButton.tsx';
import {
    UserProfileOrAuthButton,
} from '@/widgets/user/button/UserProfileOrAuthButton/ui/UserProfileOrAuthButton.tsx';
import { SiteLogoLinkTitle } from '@/entities/site/logo/SiteLogoLinkTitle.tsx';


export type HeaderNavBarProps = {};

export const HeaderNavBar: FC<HeaderNavBarProps> = memo(function HeaderNavBar (props) {
    const {} = props;

    return (
        <div className={ css.container }>
            <SiteLogoLinkTitle className={ css.logo }/>
            <ul className={ classNames(css.utils, {}, [ css.list ]) }>
                <li>
                    <ToggleLanguageButton/>
                </li>
                <li>
                    <ToggleThemeButton/>
                </li>
                <li>
                    <UserProfileOrAuthButton/>
                </li>
            </ul>
        </div>
    );
});