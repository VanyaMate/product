import {
    getAuthError,
} from '@/app/redux/slices/auth/selectors/getAuthError/getAuthError.ts';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


describe('GetAuthErrorTest', () => {
    test('should return auth.error', () => {
        const state: Partial<GlobalStoreSchema> = {
            auth: {
                error    : serviceErrorResponse(undefined),
                isPending: false,
                user     : null,
            },
        };
        expect(getAuthError(state as GlobalStoreSchema)).toEqual(serviceErrorResponse(undefined));
    });

    test('should return null where state empty', () => {
        expect(getAuthError({} as GlobalStoreSchema)).toBe(null);
    });
});