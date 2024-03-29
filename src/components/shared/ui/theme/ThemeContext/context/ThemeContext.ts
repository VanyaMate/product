import React, { createContext } from 'react';
import { Theme } from '../types/themes.ts';


export interface IThemeContext {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
    theme      : Theme.DARK,
    setTheme   : () => {
    },
    toggleTheme: () => {
    },
});