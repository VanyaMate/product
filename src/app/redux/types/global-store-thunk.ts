import { ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';


export type GlobalStoreThunk = ThunkDispatch<GlobalStoreSchema, ThunkExtraArgs, any>;

export type ThunkExtraArgs = {
    api: AxiosInstance;
}

export type ThunkApiConfig<RejectType> = {
    rejectValue: RejectType | null;
    extra: ThunkExtraArgs;
}