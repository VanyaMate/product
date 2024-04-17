import { configureStore } from '@reduxjs/toolkit';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';
import { IReducerManager } from '@/app/redux/types/reducer-manager.ts';
import { createGlobalStore } from '@/app';


export type StoreWithManager =
    ReturnType<typeof configureStore<GlobalStoreSchema>>
    & {
        reducerManager: IReducerManager<GlobalStoreSchema>;
    };

export type StoreType = ReturnType<typeof createGlobalStore>;
export type StoreStateType = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];