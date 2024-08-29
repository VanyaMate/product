import {
    LOCAL_STORAGE_SELECTED_LANGUAGE,
} from '@/features/i18n/config/const.ts';
import { TranslationLanguage } from '@/features/i18n/types/language.ts';


export const getCurrentLanguage = function (): TranslationLanguage {
    const language = localStorage.getItem(LOCAL_STORAGE_SELECTED_LANGUAGE);

    if (language) {
        switch (language) {
            case 'ru':
                return 'ru';
            case 'en':
                return 'en';
            default:
                return 'ru';
        }
    }

    return 'ru';
};