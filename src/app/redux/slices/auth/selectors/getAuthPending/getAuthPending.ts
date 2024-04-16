import { createSelector } from '@reduxjs/toolkit';
import { getAuthState } from '@/app/redux/slices/auth/selectors/getAuthState/getAuthState.ts';


export const getAuthPending = createSelector(getAuthState, (state) => state?.isPending ?? false);