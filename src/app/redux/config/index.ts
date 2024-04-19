import { configureStore } from '@reduxjs/toolkit';
import { createReducerManager } from '../config/createReducerManager.ts';
import { GlobalStoreSchema } from '../types/global-store-types.ts';
import { userReducer } from '@/app/redux/slices/user/slice/userSlice.ts';
import { api } from '@/app/axios/lib/api.ts';


export const createGlobalStore = function (initialState?: GlobalStoreSchema) {
    const reducerManager = createReducerManager({
        user: userReducer,
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
