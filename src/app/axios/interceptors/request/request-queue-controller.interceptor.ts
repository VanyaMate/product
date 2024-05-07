import {
    IAxiosQueue,
} from '@/app/axios/services/axios-queue/axios-queue.interface.ts';
import { InternalAxiosRequestConfig } from 'axios';


export const requestQueueControllerInterceptor = (queue: IAxiosQueue) => async (request: InternalAxiosRequestConfig<any>) => {
    return new Promise((resolve) => {
        queue.add(request.url, resolve);
    })
        .then(() => request);
};