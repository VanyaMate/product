import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext.ts';
import classNames from 'classnames';
import '../styles/index.scss';
import { Theme } from '@/components/shared/ui/theme/ThemeContext/types/themes.ts';
import {
    getThemeStorageValue, setThemeStorageValue,
} from '@/components/shared/ui/theme/ThemeContext/helpers/storage.ts';


export type ThemeProviderProps =
    {
        withStorage?: boolean;
        storageId?: string;
        defaultTheme?: Theme;
    }
    & React.ComponentPropsWithoutRef<'div'>;

const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
    const { withStorage, storageId, className, defaultTheme, ...other } = props;
    const [ theme, setTheme ]                                           = useState<Theme>(defaultTheme ?? getThemeStorageValue(storageId));

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

    return (
        <ThemeContext.Provider value={ themeProps }>
            <div
                className={ classNames('theme', {}, [ theme, className ]) } { ...other }
            />
        </ThemeContext.Provider>
    );
};

export default React.memo(ThemeProvider);