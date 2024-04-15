import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonStyleType, ButtonWithFixes } from '@/shared/ui-kit';
import { Theme, useThemeSwitcher } from '@/app';


export type ToggleThemeButtonProps = {};

export const ToggleThemeButton: FC<ToggleThemeButtonProps> = memo(function ToggleThemeButton (props) {
    const {}                     = props;
    const { theme, toggleTheme } = useThemeSwitcher();
    const { t }                  = useTranslation();
    const themeImageSrc          = `./images/theme/${ theme === Theme.DARK
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
});