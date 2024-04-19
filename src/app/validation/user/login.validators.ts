import { i18nConfig } from "@/app/i18n/config/i18n";
import { Validator } from '@/app/validation/types/validator.ts';


export const userAuthLoginValidator: Validator<string> = function (login: string): string {
    if (login.length < 5) {
        return i18nConfig.t('min_length_error', {
            ns: 'validation-messages', length: 5,
        });
    } else if (login.length > 20) {
        return i18nConfig.t('max_length_error', {
            ns: 'validation-messages', length: 20,
        });
    }

    return '';
};