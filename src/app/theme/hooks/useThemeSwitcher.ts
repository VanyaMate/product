import { useContext } from 'react';
import { IThemeContext, ThemeContext } from '@/app/theme/context/ThemeContext.ts';


export const useThemeSwitcher = function (): IThemeContext {
    return useContext(ThemeContext);
};