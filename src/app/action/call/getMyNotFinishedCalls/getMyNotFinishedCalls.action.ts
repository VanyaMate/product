import { request } from '@/app/lib/fetch/request.ts';
import { isArray } from 'product-types/dist/_helpers/lib/isArray';
import { DomainCall, isDomainCall } from 'product-types/dist/call/DomainCall';


export const getMyNotFinishedCallsAction = function () {
    return request(
        `v1/calls`,
        { method: 'GET' },
        (data: unknown): data is Array<DomainCall> => isArray(data, isDomainCall),
    );
};