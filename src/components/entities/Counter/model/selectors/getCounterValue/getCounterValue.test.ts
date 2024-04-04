import {
    SiteAppRtkStoreSchema,
} from '@/apps/SiteApp/configs/redux-tollkit/site-app.rtk-store-schema.ts';
import {
    getCounterValue,
} from '@/components/entities/Counter/model/selectors/getCounterValue/getCounterValue.ts';


describe('getCounter', () => {
    test('should return counter value', () => {
        const state: Partial<SiteAppRtkStoreSchema> = {
            counter: { value: 1 },
        };
        expect(getCounterValue(state as SiteAppRtkStoreSchema)).toBe(1);
    });
});