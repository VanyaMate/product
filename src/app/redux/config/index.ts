import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/app';
import { createReducerManager } from '../config/createReducerManager.ts';
import { GlobalStoreSchema } from '../types/global-store-types.ts';


export const createGlobalStore = function (initialState?: GlobalStoreSchema) {
    const reducerManager = createReducerManager({
        user: userReducer,
    });

    const store = Object.assign(
        configureStore<GlobalStoreSchema>({
            reducer       : reducerManager.reduce,
            devTools      : __IS_DEV__,
            preloadedState: initialState,
        }),
        { reducerManager },
    );

    return store;
};
