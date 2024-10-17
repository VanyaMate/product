import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';


export const isLanguageNameValidatorRhf: RhfValidator<string> = function (name: string) {
    const error = lengthValidator(1, 255)(name);
    return error ? error : true;
};