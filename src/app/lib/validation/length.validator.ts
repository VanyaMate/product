import { Validator } from './validator.type';


export const lengthValidator = function (min: number, max: number): Validator {
    return (value: unknown): string => {
        if (typeof value !== 'string') {
            return 'Значение должно быть строкой';
        }

        if (value.length < min) {
            return `Длина должна быть больше ${ min }`;
        } else if (value.length >= max) {
            return `Длина должна быть меньше ${ max }`;
        }

        return '';
    };
};