import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';


export const isLanguageWordTranslationsValidatorRhf: RhfValidator<Array<string>> = function (name: Array<string>) {
    const error = lengthValidator(1, 1024)(name.join(','));
    return error ? error : true;
};