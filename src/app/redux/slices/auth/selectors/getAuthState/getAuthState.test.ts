import {
    getAuthState,
} from '@/app/redux/slices/auth/selectors/getAuthState/getAuthState.ts';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';
import { serviceErrorResponse } from 'product-types';


describe('GetAuthStateTest', () => {
    test('should return auth', () => {
        const state: Partial<GlobalStoreSchema> = {
            auth: {
                error    : serviceErrorResponse(undefined),
                isPending: false,
            },
        };
        expect(getAuthState(state as GlobalStoreSchema)).toEqual({
            error    : serviceErrorResponse(undefined),
            isPending: false,
        });
    });

    test('should return undefined where state empty', () => {
        expect(getAuthState({} as GlobalStoreSchema)).toBe(undefined);
    });
});