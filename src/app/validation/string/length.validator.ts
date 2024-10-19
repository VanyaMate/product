import { translations } from '@/features/i18n/config/translations.ts';
import { getCurrentLanguage } from '@/features/i18n/lib/getCurrentLanguage.ts';
import {
    insertIntoTranslation,
} from '@/features/i18n/lib/insertIntoTranslation.ts';


export const lengthValidator = function (min: number, max: number) {
    return (value: unknown): string => {
        if (typeof value !== 'string') {
            return translations[getCurrentLanguage()].validation.is_not_string;
        }

        if (value.length > max) {
            return insertIntoTranslation(
                translations[getCurrentLanguage()].validation.max_length_error,
                { length: max.toString() },
            );
        } else if (value.length < min) {
            return insertIntoTranslation(
                translations[getCurrentLanguage()].validation.min_length_error,
                { length: max.toString() },
            );
        }

        return '';
    };
};