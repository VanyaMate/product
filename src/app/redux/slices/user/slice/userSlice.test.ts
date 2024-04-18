import { UserSchema, userSlice } from '@/app';


describe('UserSliceTest', () => {
    test('setAuthData', () => {
        const previousState: UserSchema = {
            data: null,
        };
        const result                    = userSlice.reducer(previousState, userSlice.actions.setAuthData({
            id: '1', username: 'admin_root',
        }));
        expect(result).toEqual({ data: { id: '1', username: 'admin_root' } });
    });

    test('removeAuthData', () => {
        const previousState: UserSchema = {
            data: {
                id: '1', username: 'admin_root',
            },
        };
        const result                    = userSlice.reducer(previousState, userSlice.actions.removeAuthData());
        expect(result).toEqual({ data: null });
    });
});