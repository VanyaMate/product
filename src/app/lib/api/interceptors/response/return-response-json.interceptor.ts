import { ResponseInterceptor } from '@vanyamate/fetch-with-interceptors';


export const returnResponseJsonInterceptor: ResponseInterceptor = async (response) => {
    // const responseData = await response.json();
    // response['data']   = responseData;
    return response;
};