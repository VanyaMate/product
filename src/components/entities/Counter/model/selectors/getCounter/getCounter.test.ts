import {
    getCounter,
} from '@/components/entities/Counter/model/selectors/getCounter/getCounter.ts';
import {
    SiteAppRtkStoreSchema,
} from '@/apps/SiteApp/configs/redux-tollkit/site-app.rtk-store-schema.ts';


describe('getCounter', () => {
    test('should return counter value', () => {
        const state: Partial<SiteAppRtkStoreSchema> = {
            counter: { value: 1 },
        };
        expect(getCounter(state as SiteAppRtkStoreSchema)).toEqual({ value: 1 });
    });
});