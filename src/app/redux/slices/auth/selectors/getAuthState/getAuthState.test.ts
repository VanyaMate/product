import { GlobalStoreSchema } from '@/app';
import {
    getAuthState,
} from '@/app/redux/slices/auth/selectors/getAuthState/getAuthState.ts';


describe('GetAuthStateTest', () => {
    test('should return auth', () => {
        const state: Partial<GlobalStoreSchema> = {
            auth: {
                error    : {
                    message: 'Error',
                    code   : 500,
                },
                isPending: false,
            },
        };
        expect(getAuthState(state as GlobalStoreSchema)).toEqual({
            error    : {
                message: 'Error',
                code   : 500,
            },
            isPending: false,
        });
    });

    test('should return undefined where state empty', () => {
        expect(getAuthState({} as GlobalStoreSchema)).toBe(undefined);
    });
});