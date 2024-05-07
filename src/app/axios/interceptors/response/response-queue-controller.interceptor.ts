import { AxiosResponse } from 'axios';
import {
    IAxiosQueue,
} from '@/app/axios/services/axios-queue/axios-queue.interface.ts';


export const responseQueueControllerInterceptor = (queue: IAxiosQueue) => (response: AxiosResponse<any, any>) => {
    queue.next(response.config.url);
    return response;
};