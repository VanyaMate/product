import React, { createContext } from 'react';


export enum Theme {
    DARK  = 'dark',
    LIGHT = 'light',
}

export type ThemeContextProps = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    toggleTheme: () => void;
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export const ThemeContext = createContext<ThemeContextProps>({
    theme      : Theme.DARK,
    setTheme   : (theme: Theme) => {
    },
    toggleTheme: () => {
    },
});
