import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback, useEffect,
    useMemo,
    useState,
} from 'react';
import { getThemeStorageValue, setThemeStorageValue } from '../helpers/storage';
import { ThemeContext } from '../context/ThemeContext.ts';
import classNames from 'classnames';
import { Theme, ThemeType } from '@/app';
import '../styles/index.scss';


export type ThemeProviderProps =
    {
        withStorage?: boolean;
        storageId?: string;
        defaultTheme?: Theme;
        isPageTheme?: boolean;
    }
    & ComponentPropsWithoutRef<'div'>;

export const ThemeProvider: FC<ThemeProviderProps> = memo(function ThemeProvider (props) {
    const {
              withStorage, storageId, className, defaultTheme, isPageTheme, ...other
          }                   = props;
    const [ theme, setTheme ] = useState<Theme>(defaultTheme ?? getThemeStorageValue(storageId));

    const toggleTheme = useCallback(() => {
        setTheme((prev) => {
            const newTheme = prev === Theme.DARK ? Theme.LIGHT : Theme.DARK;
            if (withStorage) {
                setThemeStorageValue(newTheme, storageId);
            }
            return newTheme;
        });
    }, [ storageId, withStorage ]);

    const themeProps = useMemo(() => ({
        theme, setTheme, toggleTheme,
    }), [ theme, toggleTheme ]);

    useEffect(() => {
        setTheme(defaultTheme ?? getThemeStorageValue(storageId));
    }, [ defaultTheme, storageId ]);

    useEffect(() => {
        if (isPageTheme) {
            document.body.classList.add('theme');
            for (const variantTheme in Theme) {
                document.body.classList.remove((Theme as ThemeType)[variantTheme]);
            }
            document.body.classList.add(theme);
        }
    }, [ isPageTheme, theme ]);

    return (
        <ThemeContext.Provider value={ themeProps }>
            <div
                className={ classNames('', { 'theme': !isPageTheme }, [ theme, className ]) } { ...other }
            />
        </ThemeContext.Provider>
    );
});