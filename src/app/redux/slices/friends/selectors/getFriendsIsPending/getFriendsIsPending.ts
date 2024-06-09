import { createSelector } from '@reduxjs/toolkit';
import {
    getFriendsState,
} from '@/app/redux/slices/friends/selectors/getFriendsState/getFriendsState.ts';


export const getFriendsIsPending = createSelector(getFriendsState, (state) => state.isPending);