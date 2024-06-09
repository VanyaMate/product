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
import { logout } from '@/app/redux/slices/auth/thunks/logout/logout.ts';


const initialState: FriendsSchema = {
    requestsReceived: [],
    requestsSent    : [],
    friends         : [],
    isPending       : false,
    error           : null,
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
        addFriendRequestSent (state, action: PayloadAction<DomainFriendRequest>) {
            if (state.requestsSent.every((request) => request.requestId !== action.payload.requestId)) {
                state.requestsSent.push(action.payload);
            }
        },
        addFriendRequestReceived (state, action: PayloadAction<DomainFriendRequest>) {
            if (state.requestsReceived.every((request) => request.requestId !== action.payload.requestId)) {
                state.requestsReceived.push(action.payload);
            }
        },
        removeFriendRequestSent (state, action: PayloadAction<string>) {
            state.requestsSent = state.requestsSent.filter((request) => request.requestId !== action.payload);
        },
        removeFriendRequestReceived (state, action: PayloadAction<string>) {
            state.requestsReceived = state.requestsReceived.filter((request) => request.requestId !== action.payload);
        },
    },
    extraReducers: (builder) => {
        // getFriendsWithRequestsForUser
        builder.addCase(getFriendsWithRequestsForUser.fulfilled, (state, action) => {
            state.isPending        = false;
            state.error            = null;
            state.friends          = action.payload.friends.filter(isDomainUser);
            state.requestsSent     = action.payload.requestsOut.filter(isDomainFriendRequest);
            state.requestsReceived = action.payload.requestsIn.filter(isDomainFriendRequest);
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
            state.requestsSent.push(action.payload);
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
            state.isPending        = false;
            state.error            = null;
            state.requestsReceived = state.requestsReceived.filter((request) => request.requestId !== action.payload.requestId);

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
            state.isPending        = false;
            state.error            = null;
            state.requestsSent     = state.requestsSent.filter((request) => request.requestId !== action.payload.requestId);
            state.requestsReceived = state.requestsReceived.filter((request) => request.requestId !== action.payload.requestId);
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

        builder.addCase(logout.fulfilled, (state) => {
            state.requestsReceived = [];
            state.requestsSent     = [];
            state.friends          = [];
            state.error            = null;
            state.isPending        = false;
        });
    },
});

export const {
                 actions: friendsActions,
                 reducer: friendsReducer,
             } = friendsSlice;