import {
    getAuthPending,
} from '@/app/redux/slices/auth/selectors/getAuthPending/getAuthPending.ts';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types';
import {
    serviceErrorResponse
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


describe('GetAuthPendingTest', () => {
    test('should return auth.pending false when false', () => {
        const state: Partial<GlobalStoreSchema> = {
            auth: {
                error    : serviceErrorResponse(undefined),
                isPending: false,
            },
        };
        expect(getAuthPending(state as GlobalStoreSchema)).toBe(false);
    });

    test('should return auth.pending true when true', () => {
        const state: Partial<GlobalStoreSchema> = {
            auth: {
                error    : null,
                isPending: true,
            },
        };
        expect(getAuthPending(state as GlobalStoreSchema)).toBe(true);
    });

    test('should return false where state empty', () => {
        expect(getAuthPending({} as GlobalStoreSchema)).toBe(false);
    });
});