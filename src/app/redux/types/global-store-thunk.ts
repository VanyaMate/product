import { ThunkDispatch } from '@reduxjs/toolkit';
import { GlobalStoreSchema } from '@/app';
import { AxiosInstance } from 'axios';


export type GlobalStoreThunk = ThunkDispatch<GlobalStoreSchema, ThunkExtraArgs, any>;

export type ThunkExtraArgs = {
    api: AxiosInstance;
}

export type ThunkApiConfig<RejectType> = {
    rejectValue: RejectType | null;
    extra: ThunkExtraArgs;
}