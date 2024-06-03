import { configureStore } from '@reduxjs/toolkit';
import { createReducerManager } from '../config/createReducerManager.ts';
import { GlobalStoreSchema } from '../types/global-store-types.ts';
import { api } from '@/app/axios/lib/api.ts';
import { authReducer } from '@/app/redux/slices/auth/slice/authSlice.ts';


export const createGlobalStore = function (initialState?: GlobalStoreSchema) {
    const reducerManager = createReducerManager({
        auth: authReducer,
    });

    const store = Object.assign(
        configureStore<GlobalStoreSchema>({
            reducer       : reducerManager.reduce,
            devTools      : __IS_DEV__,
            preloadedState: initialState,
            middleware    : (getDefaultMiddleware) => getDefaultMiddleware({
                thunk: {
                    extraArgument: { api },
                },
            }),
        }),
        { reducerManager },
    );

    return store;
};
