import {
    RequestXhrParams,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';
import { apiXhr } from '@/app/lib/api/xhr/apiXhr.ts';
import { jsonParse } from '@/shared/lib/json/json-parse.ts';
import { isDomainResponse } from 'product-types/dist/response/DomainResponse';


export const createDomainXhrRequest = async function (url: string, params: RequestXhrParams) {
    return apiXhr(url, params)
        .then((xhr) => xhr.response)
        .then((response) => jsonParse(response))
        .then((data: unknown) => {
            if (isDomainResponse(data)) {
                return data.data;
            }

            throw data;
        });
};