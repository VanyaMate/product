import {
    isEmailValidatorRhf,
} from '@/app/react-hook-form/validator/isEmailValidatorRhf/isEmailValidatorRhf.ts';
import {
    isImageUrlValidatorRhf,
} from '@/app/react-hook-form/validator/isImageUrlValidatorRhf/isImageUrlValidatorRhf.ts';
import {
    isLoginValidatorRhf,
} from '@/app/react-hook-form/validator/isLoginValidatorRhf/isLoginValidatorRhf.ts';
import {
    isPasswordValidatorRhf,
} from '@/app/react-hook-form/validator/isPasswordValidatorRhf/isPasswordValidatorRhf.ts';
import {
    RhfValidatorResponse,
} from '@/app/react-hook-form/types/rhf-validator.ts';


export class RhfValidator {
    static email (value: string): RhfValidatorResponse {
        return isEmailValidatorRhf(value);
    }

    static imageUrl (value: string): RhfValidatorResponse {
        return isImageUrlValidatorRhf(value);
    }

    static login (value: string): RhfValidatorResponse {
        return isLoginValidatorRhf(value);
    }

    static password (value: string): RhfValidatorResponse {
        return isPasswordValidatorRhf(value);
    }
}