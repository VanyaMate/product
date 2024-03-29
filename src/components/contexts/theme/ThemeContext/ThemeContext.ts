import React, { createContext } from 'react';
import { Theme } from './types/themes.ts';


export type ThemeContextProps = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme      : Theme.DARK,
    setTheme   : () => {
    },
    toggleTheme: () => {
    },
});