import { i18nConfig } from '@/app/i18n/config/i18n.ts';
import { Validator } from '@/app/validation/types/validator.ts';


export const userAuthPasswordValidator: Validator<string> = function (password: string): string {
    if (password.length < 6) {
        return i18nConfig.t('min_length_error', {
            ns: 'validation-messages', length: 6,
        });
    } else if (password.length > 32) {
        return i18nConfig.t('max_length_error', {
            ns: 'validation-messages', length: 32,
        });
    }

    return '';
};