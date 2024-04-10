import { useContext } from 'react';
import { Theme } from '../types/themes.ts';
import { ThemeContext } from '../context/ThemeContext.ts';


export const useTheme = function (): Theme {
    return useContext(ThemeContext).theme;
};