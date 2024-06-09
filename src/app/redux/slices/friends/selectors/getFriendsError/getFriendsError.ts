import { createSelector } from '@reduxjs/toolkit';
import {
    getFriendsState,
} from '@/app/redux/slices/friends/selectors/getFriendsState/getFriendsState.ts';


export const getFriendsError = createSelector(getFriendsState, (state) => state.error);