import axios from 'axios';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN, LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';
import { isDomainResponse } from 'product-types/dist/response/DomainResponse';
import { isDomainTokens } from 'product-types';


export const api = axios
    .create({
        baseURL: __API__,
        headers: {
            authorization  : localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN),
            'refresh-token': localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN),
        },
    });

api.interceptors.response.use(
    (response) => {
        if (isDomainResponse(response.data)) {
            if (isDomainTokens(response.data.tokens)) {
                localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, response.data.tokens[0]);
                localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, response.data.tokens[1]);
            }
        }

        return response;
    },
    (error) => Promise.reject(error),
);