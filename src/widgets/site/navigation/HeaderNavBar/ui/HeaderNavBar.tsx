import { FC, memo } from 'react';
import css from './HeaderNavBar.module.scss';
import { useTranslation } from 'react-i18next';
import { Link } from '@/shared/ui-kit';
import classNames from 'classnames';
import { UserProfileOrAuthButton } from '@/widgets/user';
import { ToggleLanguageButton } from '@/features/i18n';
import { ToggleThemeButton } from '@/features/theme';


export type HeaderNavBarProps = {};

export const HeaderNavBar: FC<HeaderNavBarProps> = memo(function HeaderNavBar (props) {
    const {}    = props;
    const { t } = useTranslation([ 'site-app' ]);

    return (
        <div className={ css.container }>
            <h1>
                <Link aria-label={ t('aria_logo') } to="/">{ t('logo') }</Link>
            </h1>
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