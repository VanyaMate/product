import { configureStore } from '@reduxjs/toolkit';
import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';
import { IReducerManager } from '@/app/redux/types/reducer-manager.ts';


export type StoreWithManager =
    ReturnType<typeof configureStore<GlobalStoreSchema>>
    & {
        reducerManager: IReducerManager<GlobalStoreSchema>;
    };