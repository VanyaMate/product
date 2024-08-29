import { Validator } from '@/app/validation/types/validator.ts';
import {
    insertIntoTranslation,
} from '@/features/i18n/lib/insertIntoTranslation.ts';
import { translations } from '@/features/i18n/config/translations.ts';
import { getCurrentLanguage } from '@/features/i18n/lib/getCurrentLanguage.ts';


export const userAuthPasswordValidator: Validator<string> = function (password: string): string {
    if (password.length < 6) {
        return insertIntoTranslation(
            translations[getCurrentLanguage()].validation.min_length_error,
            { length: '6' },
        );
    } else if (password.length > 32) {
        return insertIntoTranslation(
            translations[getCurrentLanguage()].validation.max_length_error,
            { length: '32' },
        );
    }

    return '';
};