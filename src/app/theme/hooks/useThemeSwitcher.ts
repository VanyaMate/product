import { useContext } from 'react';
import { IThemeContext, ThemeContext } from '@/app';


export const useThemeSwitcher = function (): IThemeContext {
    return useContext(ThemeContext);
};