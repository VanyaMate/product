import { AbortDictionary } from '@/app/axios/types/abort-dictionary.types.ts';
import { AxiosResponse } from 'axios';


export const responseAbortControllerInterceptor = (abortDictionary: AbortDictionary) => (response: AxiosResponse<any, any>) => {
    delete abortDictionary[response.config.url];
    return response;
};