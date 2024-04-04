import { configureStore } from '@reduxjs/toolkit';
import {
    SiteAppRtkStoreSchema,
} from '@/apps/SiteApp/configs/redux-tollkit/site-app.rtk-store-schema.ts';
import {
    counterReducer
} from '@/components/entities/_temp_/Counter/model/slice/counterSlice.ts';


export const createSiteAppReduxStore = function (initialState?: SiteAppRtkStoreSchema) {
    return configureStore<SiteAppRtkStoreSchema>({
        reducer       : {
            counter: counterReducer,
        },
        devTools      : __IS_DEV__,
        preloadedState: initialState,
    });
};