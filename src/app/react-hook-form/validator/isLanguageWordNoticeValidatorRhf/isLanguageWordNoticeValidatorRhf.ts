import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';


export const isLanguageWordNoticeValidatorRhf: RhfValidator<string> = function (name: string) {
    const error = lengthValidator(0, 1024)(name);
    return error ? error : true;
};