import { createRequest } from '@/app/lib/fetch/createRequest.ts';


export const request = async function <T> (url: RequestInfo, init: RequestInit, is: (data: unknown) => data is T) {
    return createRequest(url, init).then((data) => {
        if (is(data)) {
            return data;
        }
        throw data;
    });
};