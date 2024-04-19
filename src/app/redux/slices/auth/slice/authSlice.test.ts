import { authSlice } from '@/app/redux/slices/auth/slice/authSlice.ts';
import { authByUsername } from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';


describe('AuthSliceTest', () => {
    test('extra authByUsername pending', () => {
        const initState: AuthSchema = {
            isPending: false,
            error    : {
                message: 'Any text',
                code   : 500,
            },
        };

        const result = authSlice.reducer(initState, { type: authByUsername.pending.type });
        expect(result).toEqual({ isPending: true, error: null });
    });

    test('extra authByUsername fulfilled', () => {
        const initState: AuthSchema = {
            isPending: true,
            error    : {
                message: 'Any text',
                code   : 500,
            },
        };

        const result = authSlice.reducer(initState, { type: authByUsername.fulfilled.type });
        expect(result).toEqual({ isPending: false, error: null });
    });

    test('extra authByUsername rejected', () => {
        const initState: AuthSchema = {
            isPending: true,
            error    : null,
        };

        const result = authSlice.reducer(initState, {
            type   : authByUsername.rejected.type,
            payload: {
                message: 'Error',
                code   : 403,
            },
        });
        expect(result).toEqual({
            isPending: false,
            error    : {
                message: 'Error',
                code   : 403,
            },
        });
    });
});