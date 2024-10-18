import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import {
    imageUrlValidator,
} from '@/app/validation/image/image-url.validator.ts';


export const isImageUrlValidatorRhf: RhfValidator<string> = function (value: string) {
    const error = imageUrlValidator(value);
    return error ? error : true;
};