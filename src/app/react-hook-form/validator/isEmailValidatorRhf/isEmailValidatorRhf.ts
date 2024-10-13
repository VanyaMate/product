import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import { emailValidator } from '@/app/validation/user/email.validator.ts';


export const isEmailValidatorRhf: RhfValidator<string> = (email: string) => {
    const error = emailValidator(email);
    return error ? error : true;
};