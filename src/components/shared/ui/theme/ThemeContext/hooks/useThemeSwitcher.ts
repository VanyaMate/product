import { useContext } from 'react';
import {
    IThemeContext,
    ThemeContext,
} from '@/components/shared/ui/theme/ThemeContext/context/ThemeContext.ts';


export const useThemeSwitcher = function (): IThemeContext {
    return useContext(ThemeContext);
};