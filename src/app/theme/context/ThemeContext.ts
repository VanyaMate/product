import { createContext, Dispatch, SetStateAction } from 'react';
import { Theme } from '../types/themes';


export interface IThemeContext {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
    theme      : Theme.DARK,
    setTheme   : () => {
    },
    toggleTheme: () => {
    },
});