import { AbortDictionary } from '@/app/axios/types/abort-dictionary.types.ts';
import { InternalAxiosRequestConfig } from 'axios';


export const requestAbortControllerInterceptor = (abortDictionary: AbortDictionary) => (request: InternalAxiosRequestConfig<any>) => {
    const { url }         = request;
    const abortController = abortDictionary[url];
    if (abortController) {
        abortController.abort();
    }
    abortDictionary[url] = new AbortController();
    request.signal       = abortDictionary[url].signal;
    return request;
};