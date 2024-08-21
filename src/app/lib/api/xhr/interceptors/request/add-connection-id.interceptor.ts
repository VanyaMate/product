import {
    RequestXhrInterceptor,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';
import {
    getConnectionId,
} from '@/features/connectionId/lib/getConnectionId/getConnectionId.ts';


export const addConnectionIdInterceptor: RequestXhrInterceptor = async (url, params) => {
    params.headers['id'] = getConnectionId();
    return [ url, params ];
};