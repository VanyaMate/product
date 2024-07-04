import {
    type DomainServiceResponseError,
    isDomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';


export const returnValidErrors = function (error: unknown): DomainServiceResponseError {
    if (isDomainServiceResponseError(error)) {
        return error;
    }

    return {
        errors: [
            {
                target  : '',
                code    : 400,
                title   : 'Неизвестная ошибка',
                messages: [ JSON.stringify(error) ],
            },
        ],
    };
};