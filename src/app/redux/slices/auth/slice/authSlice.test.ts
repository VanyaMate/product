import { authSlice } from '@/app/redux/slices/auth/slice/authSlice.ts';
import { authByUsername } from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { AuthSchema } from '@/app/redux/slices/auth/types/auth.schema.ts';


describe('AuthSliceTest', () => {
    test('extra authByUsername pending', () => {
        const initState: AuthSchema = {
            isPending: false,
            error    : {
                errors: [
                    {
                        code    : 500,
                        title   : 'Client error',
                        target  : '',
                        messages: [
                            'Unknown error',
                        ],
                    },
                ],
            },
        };

        const result = authSlice.reducer(initState, { type: authByUsername.pending.type });
        expect(result).toEqual({ isPending: true, error: null });
    });

    test('extra authByUsername fulfilled', () => {
        const initState: AuthSchema = {
            isPending: true,
            error    : {
                errors: [
                    {
                        code    : 500,
                        title   : 'Client error',
                        target  : '',
                        messages: [
                            'Unknown error',
                        ],
                    },
                ],
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
                errors: [
                    {
                        code    : 500,
                        title   : 'Server error',
                        target  : 'App',
                        messages: [
                            'Unknown error',
                        ],
                    },
                ],
            },
        });
        expect(result).toEqual({
            isPending: false,
            error    : {
                errors: [
                    {
                        code    : 500,
                        title   : 'Server error',
                        target  : 'App',
                        messages: [
                            'Unknown error',
                        ],
                    },
                ],
            },
        });
    });
});