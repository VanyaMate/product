import { AxiosError } from 'axios';


export const isAxiosError = function (error: unknown): error is AxiosError {
    if (typeof error !== 'object') {
        return false;
    }

    const errorLikeRecord: Record<string, any> = error;
    return typeof errorLikeRecord.response === 'object' &&
        typeof errorLikeRecord.response.data === 'object' &&
        typeof errorLikeRecord.message === 'string' &&
        typeof errorLikeRecord.status === 'number';
};