import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import {
    isImageUrlValidatorRhf,
} from '@/app/react-hook-form/validator/isImageUrlValidatorRhf/isImageUrlValidatorRhf.ts';


export const isUserBackgroundUrlValidatorRhf: RhfValidator<string> = function (url: string) {
    if (url.length) {
        return isImageUrlValidatorRhf(url);
    }

    return true;
};