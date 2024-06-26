import { LOCAL_STORAGE_THEME_KEY } from '../config/storage.ts';
import { Theme } from '@/app/theme/types/themes.ts';


export const getThemeName = function (storageId: string = 'main'): string {
    return `${ LOCAL_STORAGE_THEME_KEY }_${ storageId }`;
};

export const getThemeStorageValue = function (storageId?: string): Theme {
    return localStorage.getItem(getThemeName(storageId)) as Theme || Theme.DARK;
};

export const setThemeStorageValue = function (newTheme: Theme, storageId?: string): void {
    localStorage.setItem(getThemeName(storageId), newTheme);
};