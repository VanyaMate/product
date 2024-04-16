import { createSelector } from '@reduxjs/toolkit';
import {
    getUserState,
} from '@/app/redux/slices/user/selectors/getUserState/getUserState.ts';


export const getUserData = createSelector(getUserState, (state) => state?.data ?? undefined);