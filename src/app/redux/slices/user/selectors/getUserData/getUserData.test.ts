import { GlobalStoreSchema } from "@/app/redux/types/global-store-types";
import {
    getUserData
} from '@/app/redux/slices/user/selectors/getUserData/getUserData.ts';

describe('GetUserData', () => {
    test('should return user.data', () => {
        const state: Partial<GlobalStoreSchema> = {
            user: {
                data: {
                    id      : '1',
                    username: 'admin',
                },
            },
        };
        expect(getUserData(state as GlobalStoreSchema)).toEqual({
            id      : '1',
            username: 'admin',
        });
    });

    test('should return null where state empty', () => {
        expect(getUserData({} as GlobalStoreSchema)).toBe(undefined);
    });
});