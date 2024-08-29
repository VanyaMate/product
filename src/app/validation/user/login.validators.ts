import { Validator } from '@/app/validation/types/validator.ts';
import {
    insertIntoTranslation,
} from '@/features/i18n/lib/insertIntoTranslation.ts';
import { translations } from '@/features/i18n/config/translations.ts';
import { getCurrentLanguage } from '@/features/i18n/lib/getCurrentLanguage.ts';


export const userAuthLoginValidator: Validator<string> = function (login: string): string {
    if (login.length < 5) {
        return insertIntoTranslation(
            translations[getCurrentLanguage()].validation.min_length_error,
            { length: '5' },
        );
    } else if (login.length > 20) {
        return insertIntoTranslation(
            translations[getCurrentLanguage()].validation.max_length_error,
            { length: '20' },
        );
    }

    return '';
};