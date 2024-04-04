import {
    SiteAppRtkStoreSchema,
} from '@/apps/SiteApp/configs/redux-tollkit/site-app.rtk-store-schema.ts';


export const getCounter = (state: SiteAppRtkStoreSchema) => {
    return state.counter;
};