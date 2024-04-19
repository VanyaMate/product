import { UserSchema } from '@/app/redux/slices/user/types/user.schema.ts';
import { userSlice } from '@/app/redux/slices/user/slice/userSlice.ts';


describe('UserSliceTest', () => {
    test('setAuthData', () => {
        const previousState: UserSchema = {
            data: null,
        };
        const result                    = userSlice.reducer(previousState, userSlice.actions.setAuthData({
            username : 'root_test',
            id       : '1',
            firstName: 'First',
            lastName : 'Last',
            avatar   : '',
        }));
        expect(result).toEqual({
            data: {
                username : 'root_test',
                id       : '1',
                firstName: 'First',
                lastName : 'Last',
                avatar   : '',
            },
        });
    });

    test('removeAuthData', () => {
        const previousState: UserSchema = {
            data: {
                username : 'root_test',
                id       : '1',
                firstName: 'First',
                lastName : 'Last',
                avatar   : '',
            },
        };
        const result                    = userSlice.reducer(previousState, userSlice.actions.removeAuthData());
        expect(result).toEqual({ data: null });
    });
});