import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';


export const isPostTextValidatorRhf: RhfValidator<string> = (text: string) => {
    const error = lengthValidator(1, 255)(text);
    return error ? error : true;
};