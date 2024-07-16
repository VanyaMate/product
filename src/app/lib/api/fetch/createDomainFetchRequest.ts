import {
    isDomainResponse,
} from 'product-types/dist/response/DomainResponse';
import { apiFetch } from '@/app/lib/api/fetch/apiFetch.ts';


export const createDomainFetchRequest = function (url: RequestInfo, init?: RequestInit) {
    return apiFetch(url, init)
        .then((response) => response.json())
        .then((data: unknown) => {
            if (isDomainResponse(data)) {
                return data.data;
            }

            throw data;
        });
};