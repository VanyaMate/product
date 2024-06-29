import { lengthValidator } from './length.validator';
import { Validator } from './validator.type';


export const passwordValidator: Validator = function (password: unknown): string {
    return lengthValidator(6, 32)(password);
};