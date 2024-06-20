import {
    FriendsSchema,
} from '@/app/redux/slices/friends/types/friends.schema.ts';
import { createSlice } from '@reduxjs/toolkit';
import {
    getFriendsWithRequestsForUser,
} from '@/app/redux/slices/friends/thunks/getFriendsWithRequestsForUser/getFriendsWithRequestsForUser.ts';
import { isDomainUser } from 'product-types/dist/user/DomainUser';
import {
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
import {
    removeFriendNotification,
} from '@/app/redux/slices/friends/thunks/removeFriend/removeFriendNotification.ts';
import {
    cancelFriendRequestNotification,
} from '@/app/redux/slices/friends/thunks/cancelFriendRequest/cancelFriendRequestNotification.ts';
import {
    acceptFriendRequestNotification,
} from '@/app/redux/slices/friends/thunks/acceptFriendRequest/acceptFriendRequestNotification.ts';
import {
    createFriendRequestForUserNotification,
} from '@/app/redux/slices/friends/thunks/createFriendRequestForUser/createFriendRequestForUserNotification.ts';
import {
    receivedFriendRequestNotification,
} from '@/app/redux/slices/friends/thunks/createFriendRequestForUser/receivedFriendRequestNotification.ts';


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
    reducers     : {},
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
            if (!state.requestsSent.find((request) => request.requestId === action.payload.requestId)) {
                state.requestsSent.push(action.payload);
            }
        });
        builder.addCase(createFriendRequestForUser.pending, (state) => {
            state.isPending = true;
            state.error     = null;
        });
        builder.addCase(createFriendRequestForUser.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });
        builder.addCase(createFriendRequestForUserNotification.fulfilled, (state, action) => {
            if (!state.requestsSent.find((request) => request.requestId === action.payload.requestId)) {
                state.requestsSent.push(action.payload);
            }
        });
        builder.addCase(receivedFriendRequestNotification.fulfilled, (state, action) => {
            if (!state.requestsReceived.find((request) => request.requestId === action.payload.requestId)) {
                state.requestsReceived.push(action.payload);
            }
        });


        // acceptFriendRequest
        builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
            state.isPending        = false;
            state.error            = null;
            state.requestsReceived = state.requestsReceived.filter((request) => request.requestId !== action.payload.requestId);
            state.requestsSent     = state.requestsSent.filter((request) => request.requestId !== action.payload.requestId);

            if (!state.friends.some((user) => user.id === action.payload.user.id)) {
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
        builder.addCase(acceptFriendRequestNotification.fulfilled, (state, action) => {
            state.requestsReceived = state.requestsReceived.filter((request) => request.requestId !== action.payload.requestId);
            state.requestsSent     = state.requestsSent.filter((request) => request.requestId !== action.payload.requestId);

            if (!state.friends.some((user) => user.id === action.payload.user.id)) {
                state.friends.push(action.payload.user);
            }
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
        builder.addCase(cancelFriendRequestNotification.fulfilled, (state, action) => {
            state.requestsSent     = state.requestsSent.filter((request) => request.requestId !== action.payload.requestId);
            state.requestsReceived = state.requestsReceived.filter((request) => request.requestId !== action.payload.requestId);
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
        builder.addCase(removeFriendNotification.fulfilled, (state, action) => {
            state.friends = state.friends.filter((user) => user.id !== action.payload.user.id);
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