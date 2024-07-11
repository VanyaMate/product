export const lengthValidator = function (min: number, max: number) {
    return (value: unknown): string => {
        if (typeof value !== 'string') {
            return 'Значение должно быть строкой';
        }

        if (value.length > max) {
            return `Значение должно быть короче чем ${ max }`;
        } else if (value.length < min) {
            return `Значение должно быть длиннее чем ${ min }`;
        }

        return '';
    };
};