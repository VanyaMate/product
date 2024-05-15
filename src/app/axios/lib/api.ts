import axios from 'axios';
import {
    responseTokenRefreshedInterceptor,
} from '@/app/axios/interceptors/response/response-token-refreshed.interceptor.ts';
import {
    responseQueueControllerInterceptor,
} from '@/app/axios/interceptors/response/response-queue-controller.interceptor.ts';
import {
    errorQueueControllerInterceptor,
} from '@/app/axios/interceptors/error/error-queue-controller.interceptor.ts';
import {
    requestQueueControllerInterceptor,
} from '@/app/axios/interceptors/request/request-queue-controller.interceptor.ts';
import {
    IAxiosQueue,
} from '@/app/axios/services/axios-queue/axios-queue.interface.ts';
import { AxiosQueue } from '@/app/axios/services/axios-queue/AxiosQueue.ts';
import {
    requestAuthorizationTokensInterceptor,
} from '@/app/axios/interceptors/request/request-authorization-tokens.interceptor.ts';
import {
    errorNotificatorInterceptor,
} from '@/app/axios/interceptors/error/error-notificator.interceptor.ts';


export const api = axios.create({ baseURL: __API__ });

const axiosQueue: IAxiosQueue = new AxiosQueue();

api.interceptors.response.use((next) => next, errorNotificatorInterceptor);
api.interceptors.response.use(responseTokenRefreshedInterceptor);
api.interceptors.response.use(
    responseQueueControllerInterceptor(axiosQueue),
    errorQueueControllerInterceptor(axiosQueue),
);

api.interceptors.request.use(requestAuthorizationTokensInterceptor);
api.interceptors.request.use(
    requestQueueControllerInterceptor(axiosQueue),
    errorQueueControllerInterceptor(axiosQueue),
);