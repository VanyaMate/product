import {
    createDomainXhrRequest,
} from '@/app/lib/api/xhr/createDomainXhrRequest.ts';
import {
    RequestXhrParams,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';


export const request = async function <T> (url: string, init: RequestXhrParams, is: (data: unknown) => data is T) {
    return createDomainXhrRequest(url, init).then((data) => {
        if (is(data)) {
            return data;
        }
        throw data;
    });
};