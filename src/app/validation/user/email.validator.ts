import { Validator } from '@/app/validation/types/validator.ts';
import { i18nConfig } from '@/app/i18n/config/i18n.ts';


export const emailValidator: Validator<string> = function (value: unknown): string {
    if (typeof value !== 'string') {
        return i18nConfig.t(`is_not_valid_email`, {
            ns: 'validation-messages',
        });
    }

    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        return '';
    }

    return i18nConfig.t(`is_not_valid_email`, {
        ns: 'validation-messages',
    });
};