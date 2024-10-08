import { FC, memo } from 'react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useThemeSwitcher } from '@/app/theme/hooks/useThemeSwitcher.ts';
import { Theme } from '@/app/theme/types/themes.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type ToggleThemeButtonProps = {};

export const ToggleThemeButton: FC<ToggleThemeButtonProps> = memo(function ToggleThemeButton (props) {
    const {}                     = props;
    const { theme, toggleTheme } = useThemeSwitcher();
    const { t }                  = useTranslation();

    return (
        <PopOver popover={ t.app.toggle_theme_aria_button }>
            <Button
                aria-label={ t.app.toggle_theme_aria_button }
                onClick={ toggleTheme }
                quad
                styleType={ ButtonStyleType.GHOST }
            >
                {
                    theme === Theme.DARK ? <IoMdMoon/> : <IoMdSunny/>
                }
            </Button>
        </PopOver>
    );
});