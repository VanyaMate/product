import { GlobalStoreSchema } from "@/app/redux/types/global-store-types";
import {
    getUserData
} from '@/app/redux/slices/user/selectors/getUserData/getUserData.ts';

describe('GetUserData', () => {
    test('should return user.data', () => {
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
        expect(getUserData(state as GlobalStoreSchema)).toEqual({
            username : 'root_test',
            id       : '1',
            firstName: 'First',
            lastName : 'Last',
            avatar   : '',
        });
    });

    test('should return null where state empty', () => {
        expect(getUserData({} as GlobalStoreSchema)).toBe(undefined);
    });
});