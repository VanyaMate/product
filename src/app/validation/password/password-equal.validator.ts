import {
    userAuthPasswordValidator,
} from '@/app/validation/user/password.validators.ts';
import { translations } from '@/features/i18n/config/translations.ts';
import { getCurrentLanguage } from '@/features/i18n/lib/getCurrentLanguage.ts';


export const passwordEqualValidator = function (firstPassword: string, secondPassword: string) {
    const passwordError = userAuthPasswordValidator(firstPassword);
    if (passwordError) {
        return passwordError;
    }

    if (secondPassword.length) {
        if (firstPassword !== secondPassword) {
            return translations[getCurrentLanguage()].validation.no_equal_password;
        }
    }

    return '';
};