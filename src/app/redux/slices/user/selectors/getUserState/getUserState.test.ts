import { getUserState, GlobalStoreSchema } from '@/app';


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