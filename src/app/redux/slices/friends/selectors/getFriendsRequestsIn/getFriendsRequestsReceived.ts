import { createSelector } from '@reduxjs/toolkit';
import {
    getFriendsState,
} from '@/app/redux/slices/friends/selectors/getFriendsState/getFriendsState.ts';


export const getFriendsRequestsReceived = createSelector(getFriendsState, (state) => state?.requestsReceived ?? []);