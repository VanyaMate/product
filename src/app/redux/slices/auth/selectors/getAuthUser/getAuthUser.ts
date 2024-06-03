import { createSelector } from '@reduxjs/toolkit';
import {
    getAuthState,
} from '@/app/redux/slices/auth/selectors/getAuthState/getAuthState.ts';


export const getAuthUser = createSelector(getAuthState, (state) => state?.user ?? null);