import { AbortDictionary } from '@/app/axios/types/abort-dictionary.types.ts';
import { AxiosError } from 'axios';


export const errorAbortControllerInterceptor = (abortDictionary: AbortDictionary) => (error: AxiosError) => {
    delete abortDictionary[error.config.url];
    throw error;
};