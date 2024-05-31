import {
    FriendsSchema,
} from '@/app/redux/slices/friends/types/friends.schema.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getFriendsWithRequestsForUser,
} from '@/app/redux/slices/friends/thunks/getFriendsWithRequestsForUser.ts';
import { DomainUser, isDomainUser } from 'product-types/dist/user/DomainUser';
import {
    DomainFriendRequest,
    isDomainFriendRequest,
} from 'product-types/dist/friends/DomainFriendRequest';


const initialState: FriendsSchema = {
    requestsIn : [],
    requestsOut: [],
    friends    : [],
    isPending  : false,
    error      : null,
};

export const friendsSlice = createSlice({
    name         : 'friends',
    initialState : initialState,
    reducers     : {
        addFriend (state, action: PayloadAction<DomainUser>) {
            state.friends.push(action.payload);
        },
        removeFriend (state, action: PayloadAction<string>) {
            state.friends = state.friends.filter((friend) => friend.id !== action.payload);
        },
        addFriendRequestIn (state, action: PayloadAction<DomainFriendRequest>) {
            state.requestsIn.push(action.payload);
        },
        addFriendRequestOut (state, action: PayloadAction<DomainFriendRequest>) {
            state.requestsOut.push(action.payload);
        },
        removeFriendRequestIn (state, action: PayloadAction<string>) {
            state.requestsIn = state.requestsIn.filter((request) => request.requestId !== action.payload);
        },
        removeFriendRequestOut (state, action: PayloadAction<string>) {
            state.requestsOut = state.requestsOut.filter((request) => request.requestId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFriendsWithRequestsForUser.fulfilled, (state, action) => {
            state.isPending   = false;
            state.error       = null;
            state.friends     = action.payload.friends.filter(isDomainUser);
            state.requestsOut = action.payload.requestsOut.filter(isDomainFriendRequest);
            state.requestsIn  = action.payload.requestsIn.filter(isDomainFriendRequest);
        });
        builder.addCase(getFriendsWithRequestsForUser.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(getFriendsWithRequestsForUser.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });
    },
});

export const {
                 actions: friendsActions,
                 reducer: friendsReducer,
             } = friendsSlice;