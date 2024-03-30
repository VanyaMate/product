import React from 'react';
import {
    useThemeSwitcher,
} from '@/components/shared/ui/theme/ThemeContext/hooks/useThemeSwitcher.ts';
import { ButtonStyleType } from '@/components/shared/ui/buttons/Button/types/types.ts';
import { Theme } from '@/components/shared/ui/theme/ThemeContext/types/themes.ts';
import ButtonWithFixes
    from '@/components/shared/ui/buttons/ButtonWithFixes/ButtonWithFixes.tsx';
import { useTranslation } from 'react-i18next';


export type ToggleThemeButtonProps = {};

const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = (props) => {
    const {}                     = props;
    const { theme, toggleTheme } = useThemeSwitcher();
    const { t }                  = useTranslation();
    const themeImageSrc          = `/public/assets/images/theme/${ theme === Theme.DARK
                                                                   ? 'moon.png'
                                                                   : 'sun.png' }`;

    return (
        <ButtonWithFixes
            aria-label={ t('toggle_theme_aria_button') }
            onClick={ toggleTheme }
            pref={
                // TODO: Add icon
                <img
                    alt={ t('toggle_theme_image_alt_button') }
                    src={ themeImageSrc }
                    style={ { width: 20 } }
                />
            }
            styleType={ ButtonStyleType.PRIMARY }
        >
            { t('toggle_theme_button') }
        </ButtonWithFixes>
    );
};

export default React.memo(ToggleThemeButton);