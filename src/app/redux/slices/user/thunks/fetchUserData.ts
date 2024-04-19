import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/app/types/user';
import { ThunkApiConfig } from '@/app/redux/types/global-store-thunk.ts';
import { ThunkError } from '@/app/redux/types/thunkError.ts';
import { thunkCatch } from '@/app/redux/catch/thunk-catch.ts';


export type FetchUserDataProps = {
    username: string;
}

export const fetchUserData = createAsyncThunk<User, FetchUserDataProps, ThunkApiConfig<ThunkError>>(
    'profile/fetchUserData',
    async (userData, thunkAPI) => {
        const { rejectWithValue, extra: { api } } = thunkAPI;
        try {
            return api
                .get(`/users?username=${ userData.username }`)
                .then((response) => response.data)
                .then(([ user ]) => user);
            
        } catch (e) {
            return thunkCatch(e, rejectWithValue);
        }
    },
);