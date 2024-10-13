import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import {
    userAuthPasswordValidator,
} from '@/app/validation/user/password.validators.ts';


export const isPasswordValidatorRhf: RhfValidator<string> = (password: string) => {
    const error = userAuthPasswordValidator(password);
    return error ? error : true;
};