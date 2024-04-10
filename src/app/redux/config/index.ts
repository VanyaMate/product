import { configureStore } from '@reduxjs/toolkit';
import { authReducer, AuthSchema, userReducer, UserSchema } from '@/app';


export interface GlobalStoreSchema {
    user: UserSchema;
    auth: AuthSchema;
}

export const createGlobalStore = function (initialState?: GlobalStoreSchema) {
    return configureStore<GlobalStoreSchema>({
        reducer       : {
            user: userReducer,
            auth: authReducer,
        },
        devTools      : __IS_DEV__,
        preloadedState: initialState,
    });
};