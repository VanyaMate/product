import { createSelector } from '@reduxjs/toolkit';
import { getAuthState } from '@/app/redux/slices/auth/selectors/getAuthState.ts';


export const getAuthError = createSelector(getAuthState, (state) => state.error);