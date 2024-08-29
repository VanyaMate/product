import { useContext } from 'react';
import {
    TranslationContext,
} from '@/features/i18n/provider/TranslationProvider.tsx';
import { translations } from '@/features/i18n/config/translations.ts';
import {
    insertIntoTranslation,
} from '@/features/i18n/lib/insertIntoTranslation.ts';


export const useTranslation = function () {
    const { language, setLanguage } = useContext(TranslationContext);

    return {
        t      : translations[language],
        replace: insertIntoTranslation,
        set    : setLanguage,
        language,
    };
};