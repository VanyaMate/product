import { ServerResponseError } from '@/app/types/api/server-response-error.ts';


export const isApiResponseError = function (error: unknown): error is ServerResponseError {
    if (typeof error !== 'object') {
        return false;
    }
    const errorLikeRecord: Record<string, any> = error;
    return typeof errorLikeRecord.message === 'string';
};