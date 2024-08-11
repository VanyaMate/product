import {
    userAuthPasswordValidator,
} from '@/app/validation/user/password.validators.ts';
import i18n from 'i18next';


export const passwordEqualValidator = function (firstPassword: string, secondPassword: string) {
    const passwordError = userAuthPasswordValidator(firstPassword);
    if (passwordError) {
        return passwordError;
    }

    if (secondPassword.length) {
        if (firstPassword !== secondPassword) {
            return i18n.t('no_equal_password', { ns: 'validation-messages' });
        }
    }

    return '';
};