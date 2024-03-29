import React, { useCallback, useMemo, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import classNames from 'classnames';
import { Theme } from '@/components/contexts/theme/ThemeContext/types/themes.ts';
import {
    getThemeStorageValue, setThemeStorageValue,
} from '@/components/contexts/theme/ThemeContext/helpers/storage.ts';
import '../styles/index.scss';


export type ThemeProviderProps = {
    children: React.ReactNode;
    withStorage?: boolean;
    storageId?: string;
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