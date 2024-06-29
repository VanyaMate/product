import { Validator } from './validator.type';


export const emailValidator: Validator = function (value: unknown): string {
    if (typeof value !== 'string') {
        return 'Почта должна быть строкой';
    }

    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        return '';
    }

    return 'Невалидная почта';
};