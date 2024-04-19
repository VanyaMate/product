import { isAxiosError } from '@/app/type-guards/axios/isAxiosError.ts';
import { isApiResponseError } from '@/app/type-guards/api/isApiResponseError.ts';
//TODO: Понять почему тут ошибка и как пофиксить
//eslint-disable-next-line
//@ts-ignore
import type { GetThunkAPI } from '@reduxjs/toolkit/src/createAsyncThunk.ts';


export const thunkCatch = function (error: unknown, rejectWithValue: GetThunkAPI.rejectWithValue) {
    if (isAxiosError(error)) {
        const response  = error.response;
        const errorData = response.data;
        if (isApiResponseError(errorData)) {
            return rejectWithValue({
                code   : response.status,
                message: errorData.message,
            });
        }
        return rejectWithValue({
            code   : response.status,
            message: error.message,
        });
    }
    return rejectWithValue({
        code   : 500,
        message: 'Unknown error',
    });
};