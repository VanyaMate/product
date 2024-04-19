import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useThemeSwitcher } from '@/app/theme/hooks/useThemeSwitcher.ts';
import { Theme } from '@/app/theme/types/themes.ts';


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