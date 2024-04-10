import { i18nConfig, Validator } from '@/app';


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