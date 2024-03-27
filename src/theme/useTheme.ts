import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';


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