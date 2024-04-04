
import {
    SiteAppRtkStoreSchema,
} from '@/apps/SiteApp/configs/redux-tollkit/site-app.rtk-store-schema.ts';
import {
    getCounter
} from '@/components/entities/_temp_/Counter/model/selectors/getCounter/getCounter.ts';


describe('getCounter', () => {
    test('should return counter value', () => {
        const state: Partial<SiteAppRtkStoreSchema> = {
            counter: { value: 1 },
        };
        expect(getCounter(state as SiteAppRtkStoreSchema)).toEqual({ value: 1 });
    });
});