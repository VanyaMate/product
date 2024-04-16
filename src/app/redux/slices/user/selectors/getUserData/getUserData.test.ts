import { getUserData, GlobalStoreSchema } from '@/app';


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