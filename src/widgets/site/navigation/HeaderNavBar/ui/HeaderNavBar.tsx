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
import {
    DropdownModal,
} from '@/shared/ui-kit/modal/DropdownModal/ui/DropdownModal.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoNotifications } from 'react-icons/io5';
import {
    UserAuthFormWithUsernameByJsonServer,
} from '@/widgets/user/form/UserAuthFormWithUsernameByJsonServer/ui/UserAuthFormWithUsernameByJsonServer.tsx';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';


export type HeaderNavBarProps = {};

export const HeaderNavBar: FC<HeaderNavBarProps> = memo(function HeaderNavBar (props) {
    const {}              = props;
    const modalController = useModalController();

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
                    <DropdownModal
                        controller={ modalController }
                        dropdown={ <UserAuthFormWithUsernameByJsonServer/> }
                    >
                        <Button
                            onClick={ () => modalController.setOpened((prev) => !prev) }
                            quad><IoNotifications/></Button>
                    </DropdownModal>
                </li>
                <li>
                    <UserProfileOrAuthButton/>
                </li>
            </ul>
        </div>
    );
});