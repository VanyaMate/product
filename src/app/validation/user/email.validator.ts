import { Validator } from '@/app/validation/types/validator.ts';
import { translations } from '@/features/i18n/config/translations.ts';
import { getCurrentLanguage } from '@/features/i18n/lib/getCurrentLanguage.ts';


export const emailValidator: Validator<string> = function (value: unknown): string {
    if (typeof value !== 'string') {
        return translations[getCurrentLanguage()].validation.is_not_valid_email;
    }

    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        return '';
    }

    return translations[getCurrentLanguage()].validation.is_not_valid_email;
};