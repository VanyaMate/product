import { configureStore } from '@reduxjs/toolkit';
import { userReducer, UserSchema } from '@/app';


export interface GlobalStoreSchema {
    user: UserSchema;
}

export const createGlobalStore = function (initialState?: GlobalStoreSchema) {
    return configureStore<GlobalStoreSchema>({
        reducer       : {
            user: userReducer,
        },
        devTools      : __IS_DEV__,
        preloadedState: initialState,
    });
};