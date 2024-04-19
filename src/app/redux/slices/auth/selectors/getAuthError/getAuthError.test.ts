import {
    getAuthError,
} from '@/app/redux/slices/auth/selectors/getAuthError/getAuthError.ts';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';


describe('GetAuthErrorTest', () => {
    test('should return auth.error', () => {
        const state: Partial<GlobalStoreSchema> = {
            auth: {
                error    : {
                    message: 'Error',
                    code   : 500,
                },
                isPending: false,
            },
        };
        expect(getAuthError(state as GlobalStoreSchema)).toEqual({
            message: 'Error', code: 500,
        });
    });

    test('should return null where state empty', () => {
        expect(getAuthError({} as GlobalStoreSchema)).toBe(null);
    });
});