import { AxiosError } from 'axios';
import { toast } from 'sonner';
import {
    isDomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';


export const errorNotificatorInterceptor = (error: AxiosError) => {
    const errorData: unknown = error.response.data;
    if (isDomainServiceResponseError(errorData)) {
        errorData.errors.map((error) => toast(error.title, {
            duration   : 5000,
            description: error.messages[0],
        }));
    }
    throw error;
};