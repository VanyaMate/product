import {
    ResponseInterceptor,
} from '@/app/lib/fetch/createFetchWithInterceptors.ts';


export const returnResponseJsonInterceptor: ResponseInterceptor = async (response) => {
    // const responseData = await response.json();
    // response['data']   = responseData;
    return response;
};