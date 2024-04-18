import axios from 'axios';
import {
    LOCAL_STORAGE_USER_AUTH_KEY,
} from '@/app/redux/slices/user/consts/storage.const.ts';


export const api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: localStorage.getItem(LOCAL_STORAGE_USER_AUTH_KEY),
    },
});