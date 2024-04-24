import axios from 'axios';
import { authByUsername } from '@/app/redux/slices/auth/thunks/authByUsername.ts';
import { Dispatch } from '@reduxjs/toolkit';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';
import { userActions } from '@/app/redux/slices/user/slice/userSlice.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';


jest.mock('axios');

const mockedAxios          = jest.mocked(axios);
const userData: DomainUser = {
    id    : '1',
    login : 'root_test',
    avatar: '',
};

describe('AuthByUsernameTest', () => {
    let dispatch: Dispatch;
    let getState: () => GlobalStoreSchema;

    beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn();
    });

    test('Valid auth', async () => {
        mockedAxios.post.mockReturnValueOnce(Promise.resolve({
            data: { data: { user: { ...userData }, tokens: [ '', '' ] } },
        }));
        const action = authByUsername({
            login   : 'admin',
            password: '123123123',
        });

        const result = await action(dispatch, getState, {
            api: mockedAxios,
        });
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData({ ...userData }));
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual({ ...userData });
    });

    test('No valid auth', async () => {
        mockedAxios.post.mockRejectedValueOnce({
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
        });
        const action = authByUsername({
            login   : 'admin',
            password: '123123123',
        });
        const result = await action(dispatch, getState, {
            api: mockedAxios,
        });
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({
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
        });
    });

    test('Unknown error', async () => {
        mockedAxios.post.mockReturnValueOnce(Promise.resolve({ data: undefined }));
        const action = authByUsername({
            login   : 'admin',
            password: '123123123',
        });
        const result = await action(dispatch, getState, {
            api: mockedAxios,
        });
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual({
            errors: [
                {
                    code    : 500,
                    title   : 'Client error',
                    target  : 'Axios',
                    messages: [
                        'Variable responseData does not correspond to type DomainResponse',
                    ],
                },
            ],
        });
    });
});