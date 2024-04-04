import { configureStore } from '@reduxjs/toolkit';
import {
    SiteAppRtkStoreSchema,
} from '@/apps/SiteApp/configs/redux-tollkit/site-app.rtk-store-schema.ts';
import {
    counterReducer,
} from '@/components/entities/_temp_/Counter/model/slice/counterSlice.ts';
import { userReducer } from '@/components/entities/users/model/slice/userSlice.ts';


export const createSiteAppReduxStore = function (initialState?: SiteAppRtkStoreSchema) {
    return configureStore<SiteAppRtkStoreSchema>({
        reducer       : {
            counter: counterReducer,
            user   : userReducer,
        },
        devTools      : __IS_DEV__,
        preloadedState: initialState,
    });
};