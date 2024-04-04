import { createSelector } from '@reduxjs/toolkit';
import {
    getCounter
} from '@/components/entities/_temp_/Counter/model/selectors/getCounter/getCounter.ts';


export const getCounterValue = createSelector(getCounter, (counter) => counter.value);