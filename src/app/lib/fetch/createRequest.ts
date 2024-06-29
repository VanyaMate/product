import {
    isDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { api } from '@/app/lib/api/api.ts';


export const createRequest = function (url: RequestInfo, init?: RequestInit) {
    return api(url, init)
        .then((response) => response.json())
        .then((data: unknown) => {
            if (isDomainResponse(data)) {
                return data.data;
            }

            throw data;
        });
};