import axios from 'axios';
import { authByUsername } from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { Dispatch } from '@reduxjs/toolkit';
import { GlobalStoreSchema, User, userActions } from '@/app';


jest.mock('axios');

const mockedAxios    = jest.mocked(axios);
const userData: User = {
    username: 'root_test', id: '1',
};

describe('AuthByUsernameSkipTest', () => {
    let dispatch: Dispatch;
    let getState: () => GlobalStoreSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('Valid auth', async () => {
        mockedAxios.post.mockReturnValueOnce(Promise.resolve({
            data: { ...userData },
        }));
        const action = authByUsername({
            username: 'admin',
            password: '123123123',
        });

        const result = await action(dispatch, getState, undefined);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData({ ...userData }));
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({ ...userData });
    });

    test('No valid auth', async () => {
        mockedAxios.post.mockRejectedValueOnce({
            status  : 401,
            message : 'string',
            response: {
                data: {
                    message: 'No valid data',
                },
            },
        });
        const action = authByUsername({
            username: 'admin',
            password: '123123123',
        });
        const result = await action(dispatch, getState, undefined);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({
            code: 401, message: 'No valid data',
        });
    });

    test('Unknown error', async () => {
        const action = authByUsername({
            username: 'admin',
            password: '123123123',
        });
        const result = await action(dispatch, getState, undefined);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({
            code: 500, message: 'Unknown error',
        });
    });
});