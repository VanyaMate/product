import { GlobalStoreSchema } from "@/app/redux/types/global-store-types";
import {
    getUserState
} from '@/app/redux/slices/user/selectors/getUserState/getUserState.ts';

describe('GetUserState', () => {
    test('should return user state', () => {
        const state: Partial<GlobalStoreSchema> = {
            user: {
                data: {
                    username : 'root_test',
                    id       : '1',
                    firstName: 'First',
                    lastName : 'Last',
                    avatar   : '',
                },
            },
        };
        expect(getUserState(state as GlobalStoreSchema)).toEqual({
            data: {
                username : 'root_test',
                id       : '1',
                firstName: 'First',
                lastName : 'Last',
                avatar   : '',
            },
        });
    });

    test('should return undefined where state empty', () => {
        expect(getUserState({} as GlobalStoreSchema)).toBe(undefined);
    });
});