import { GlobalStoreSchema } from "@/app/redux/types/global-store-types";
import {
    getUserState
} from '@/app/redux/slices/user/selectors/getUserState/getUserState.ts';

describe('GetUserState', () => {
    test('should return user state', () => {
        const state: Partial<GlobalStoreSchema> = {
            user: {
                data: {
                    id      : '1',
                    username: 'admin',
                },
            },
        };
        expect(getUserState(state as GlobalStoreSchema)).toEqual({
            data: {
                id      : '1',
                username: 'admin',
            },
        });
    });

    test('should return undefined where state empty', () => {
        expect(getUserState({} as GlobalStoreSchema)).toBe(undefined);
    });
});