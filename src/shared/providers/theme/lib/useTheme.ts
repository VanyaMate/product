import { useContext } from 'react';
import { Theme, ThemeContext } from '@/shared/context/theme';


export interface IUseTheme {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = function (): IUseTheme {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return {
        theme, toggleTheme,
    };
};