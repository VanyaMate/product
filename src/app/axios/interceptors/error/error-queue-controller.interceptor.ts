import { AxiosError } from 'axios';
import {
    IAxiosQueue,
} from '@/app/axios/services/axios-queue/axios-queue.interface.ts';


export const errorQueueControllerInterceptor = (queue: IAxiosQueue) => (error: AxiosError) => {
    queue.next(error.config.url);
    throw error;
};