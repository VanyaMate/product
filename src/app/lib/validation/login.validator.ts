import { Validator } from './validator.type';
import { lengthValidator } from '@/app/lib/validation/length.validator.ts';


export const loginValidator: Validator = function (login: unknown): string {
    return lengthValidator(5, 20)(login);
};