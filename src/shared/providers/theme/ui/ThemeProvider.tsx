import React, { useCallback, useMemo, useState } from 'react';
import { classNames } from '@/shared';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '@/shared/context/theme';


export type ThemeProviderProps = {
    children: React.ReactNode;
    withStorage?: boolean;
    storageId?: string;
};

const getThemeName = function (storageId: string = 'main'): string {
    return `${ LOCAL_STORAGE_THEME_KEY }_${ storageId }`;
};

const getThemeStorageValue = function (storageId?: string): Theme {
    return localStorage.getItem(getThemeName(storageId)) as Theme || Theme.DARK;
};

const setThemeStorageValue = function (newTheme: Theme, storageId?: string): void {
    localStorage.setItem(getThemeName(storageId), newTheme);
};

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
    const { children, withStorage, storageId } = props;
    const [ theme, setTheme ]                  = useState<Theme>(getThemeStorageValue(storageId));

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

    return (
        <ThemeContext.Provider value={ themeProps }>
            <div className={ classNames('theme', {}, [ theme ]) }>
                { children }
            </div>
        </ThemeContext.Provider>
    );
};

export default React.memo(ThemeProvider);