import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonStyleType } from '@/shared/ui-kit';
import { Theme, useThemeSwitcher } from '@/app';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';


export type ToggleThemeButtonProps = {};

export const ToggleThemeButton: FC<ToggleThemeButtonProps> = memo(function ToggleThemeButton (props) {
    const {}                     = props;
    const { theme, toggleTheme } = useThemeSwitcher();
    const { t }                  = useTranslation();

    return (
        <Button
            aria-label={ t('toggle_theme_aria_button') }
            onClick={ toggleTheme }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            {
                theme === Theme.DARK ? <IoMdMoon/> : <IoMdSunny/>
            }
        </Button>
    );
});