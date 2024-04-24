import {
    DomainServiceResponseError
} from 'product-types/dist/error/DomainServiceResponseError';


export type ThunkState = {
    isPending: boolean;
    error: DomainServiceResponseError | null;
}