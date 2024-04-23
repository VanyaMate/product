import { DomainServiceResponseError } from 'product-types';


export type ThunkState = {
    isPending: boolean;
    error: DomainServiceResponseError | null;
}