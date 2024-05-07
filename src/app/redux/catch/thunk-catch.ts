import { isAxiosError } from '@/app/type-guards/axios/isAxiosError.ts';
//TODO: Понять почему тут ошибка и как пофиксить
//eslint-disable-next-line
//@ts-ignore
import type { GetThunkAPI } from '@reduxjs/toolkit/src/createAsyncThunk.ts';
import {
    serviceErrorResponse,
} from 'product-types/dist/_helpers/lib/serviceErrorResponse';


export const thunkCatch = function (error: unknown, rejectWithValue: GetThunkAPI.rejectWithValue) {
    if (isAxiosError(error)) {
        const response  = error.response;
        const errorData = response.data;
        return rejectWithValue(serviceErrorResponse(errorData, 'Axios', 500, 'Client error'));
    }
    return rejectWithValue(serviceErrorResponse(error, 'Axios', 500, 'Client error'));
};