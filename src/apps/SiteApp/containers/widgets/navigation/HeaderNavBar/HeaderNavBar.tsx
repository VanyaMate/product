import React from 'react';
import css from './HeaderNavBar.module.scss';
import ToggleThemeButton
    from '@/components/shared/ui/theme/ThemeContext/ui/ToggleThemeButton/ToggleThemeButton.tsx';
import Link from '@/components/shared/ui/links/Link/Link.tsx';
import { useTranslation } from 'react-i18next';
import ToggleLanguageButton
    from '@/components/shared/ui/i18n/ToggleLanguageButton/ToggleLanguageButton.tsx';
import classNames from 'classnames';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import {
    useModalController,
} from '@/components/shared/ui/modal/Modal/hooks/useModalController.ts';
import Modal from '@/components/shared/ui/modal/Modal/Modal.tsx';
import Counter from '@/components/entities/Counter/Counter.tsx';


export type HeaderNavBarProps = {};

const HeaderNavBar: React.FC<HeaderNavBarProps> = (props) => {
    const {}         = props;
    const { t }      = useTranslation();
    const controller = useModalController();

    return (
        <header className={ css.container }>
            <h1>
                <Link aria-label={ t('aria_logo') } to="/">{ t('logo') }</Link>
            </h1>
            <div className={ css.side }>
                <Modal controller={ controller }>
                    <Counter/>
                </Modal>
                <Button onClick={ () => controller.setOpened(true) }>[-]</Button>
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
                </ul>
            </div>
        </header>
    );
};

export default React.memo(HeaderNavBar);