import {
    FriendsSchema,
} from '@/app/redux/slices/friends/types/friends.schema.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getFriendsWithRequestsForUser,
} from '@/app/redux/slices/friends/thunks/getFriendsWithRequestsForUser/getFriendsWithRequestsForUser.ts';
import { DomainUser, isDomainUser } from 'product-types/dist/user/DomainUser';
import {
    DomainFriendRequest,
    isDomainFriendRequest,
} from 'product-types/dist/friends/DomainFriendRequest';
import {
    createFriendRequestForUser,
} from '@/app/redux/slices/friends/thunks/createFriendRequestForUser/createFriendRequestForUser.ts';
import {
    acceptFriendRequest,
} from '@/app/redux/slices/friends/thunks/acceptFriendRequest/acceptFriendRequest.ts';
import {
    cancelFriendRequest,
} from '@/app/redux/slices/friends/thunks/cancelFriendRequest/cancelFriendRequest.ts';
import {
    removeFriend,
} from '@/app/redux/slices/friends/thunks/removeFriend/removeFriend.ts';


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
            if (state.friends.every((user) => user.id !== action.payload.id)) {
                state.friends.push(action.payload);
            }
        },
        removeFriend (state, action: PayloadAction<string>) {
            state.friends = state.friends.filter((friend) => friend.id !== action.payload);
        },
        addFriendRequestIn (state, action: PayloadAction<DomainFriendRequest>) {
            if (state.requestsIn.every((request) => request.requestId !== action.payload.requestId)) {
                state.requestsIn.push(action.payload);
            }
        },
        addFriendRequestOut (state, action: PayloadAction<DomainFriendRequest>) {
            if (state.requestsOut.every((request) => request.requestId !== action.payload.requestId)) {
                state.requestsOut.push(action.payload);
            }
        },
        removeFriendRequestIn (state, action: PayloadAction<string>) {
            state.requestsIn = state.requestsIn.filter((request) => request.requestId !== action.payload);
        },
        removeFriendRequestOut (state, action: PayloadAction<string>) {
            state.requestsOut = state.requestsOut.filter((request) => request.requestId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // getFriendsWithRequestsForUser
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


        // createFriendRequestForUser
        builder.addCase(createFriendRequestForUser.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.requestsOut.push(action.payload);
        });
        builder.addCase(createFriendRequestForUser.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(createFriendRequestForUser.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });


        // acceptFriendRequest
        builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
            state.isPending  = false;
            state.error      = null;
            state.requestsIn = state.requestsIn.filter((request) => request.requestId !== action.payload.requestId);

            if (state.friends.every((user) => user.id !== action.payload.user.id)) {
                state.friends.push(action.payload.user);
            }
        });
        builder.addCase(acceptFriendRequest.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(acceptFriendRequest.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });


        // cancelFriendRequest
        builder.addCase(cancelFriendRequest.fulfilled, (state, action) => {
            state.isPending   = false;
            state.error       = null;
            state.requestsOut = state.requestsOut.filter((request) => request.requestId !== action.payload.requestId);
            state.requestsIn  = state.requestsIn.filter((request) => request.requestId !== action.payload.requestId);
        });
        builder.addCase(cancelFriendRequest.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(cancelFriendRequest.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });


        // removeFriend
        builder.addCase(removeFriend.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.friends   = state.friends.filter((user) => user.id !== action.payload.user.id);
        });
        builder.addCase(removeFriend.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(removeFriend.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });
    },
});

export const {
                 actions: friendsActions,
                 reducer: friendsReducer,
             } = friendsSlice;