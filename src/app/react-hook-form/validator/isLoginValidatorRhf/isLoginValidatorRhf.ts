import { RhfValidator } from '@/app/react-hook-form/types/rhf-validator.ts';
import {
    userAuthLoginValidator,
} from '@/app/validation/user/login.validators.ts';


export const isLoginValidatorRhf: RhfValidator<string> = (login: string) => {
    const error = userAuthLoginValidator(login);
    return error ? error : true;
};