import { effect, store } from '@vanyamate/sec';
import { DomainUser, isDomainUser } from 'product-types/dist/user/DomainUser';
import {
    DomainFriendRequest, isDomainFriendRequest,
} from 'product-types/dist/friends/DomainFriendRequest';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    acceptFriendRequestAction,
} from '@/app/action/friends/acceptFriendRequest/acceptFriendRequest.action.ts';
import {
    getMyFriendsAction,
} from '@/app/action/friends/getMyFriends/getMyFriends.action.ts';
import {
    removeFriendAction,
} from '@/app/action/friends/removeFriend/removeFriend.action.ts';
import {
    createFriendRequestAction,
} from '@/app/action/friends/createFriendRequest/createFriendRequest.action.ts';
import {
    cancelFriendRequestAction,
} from '@/app/action/friends/cancelFriendRequest/cancelFriendRequest.action.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';
import { logoutEffect } from '@/app/model/auth/auth.model.ts';


export const acceptFriendRequestEffect = effect(acceptFriendRequestAction);
export const cancelFriendRequestEffect = effect(cancelFriendRequestAction);
export const createFriendRequestEffect = effect(createFriendRequestAction);
export const getMyFriendsEffect        = effect(getMyFriendsAction);
export const removeFriendEffect        = effect(removeFriendAction);


export const $friendsIsPending = store<boolean>(false)
    .on(acceptFriendRequestEffect, 'onBefore', () => true)
    .on(cancelFriendRequestEffect, 'onBefore', () => true)
    .on(createFriendRequestEffect, 'onBefore', () => true)
    .on(getMyFriendsEffect, 'onBefore', () => true)
    .on(removeFriendEffect, 'onBefore', () => true)
    .on(acceptFriendRequestEffect, 'onFinally', () => false)
    .on(cancelFriendRequestEffect, 'onFinally', () => false)
    .on(createFriendRequestEffect, 'onFinally', () => false)
    .on(getMyFriendsEffect, 'onFinally', () => false)
    .on(removeFriendEffect, 'onFinally', () => false);


export const $friendsError = store<DomainServiceResponseError | null>(null)
    .on(acceptFriendRequestEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(cancelFriendRequestEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(createFriendRequestEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(getMyFriendsEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(removeFriendEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(logoutEffect, 'onBefore', () => null);


export const $friendsList = store<Array<DomainUser>>([])
    .on(acceptFriendRequestEffect, 'onSuccess', (state, { result }) => [ ...state, result.user ])
    .on(getMyFriendsEffect, 'onSuccess', (_, { result }) => result.friends.filter(isDomainUser))
    .on(removeFriendEffect, 'onSuccess', (state, { args: [ userId ] }) => state.filter((friend) => friend.id !== userId))
    .on(logoutEffect, 'onBefore', () => null);


export const $friendRequestsReceived = store<Array<DomainFriendRequest>>([])
    .on(acceptFriendRequestEffect, 'onSuccess', (state, { args: [ requestId ] }) => state.filter((request) => request.requestId !== requestId))
    .on(cancelFriendRequestEffect, 'onSuccess', (state, { args: [ requestId ] }) => state.filter((request) => request.requestId !== requestId))
    .on(getMyFriendsEffect, 'onSuccess', (_, { result }) => result.requestsIn.filter(isDomainFriendRequest))
    .on(logoutEffect, 'onBefore', () => null);


export const $friendRequestsSent = store<Array<DomainFriendRequest>>([])
    .on(cancelFriendRequestEffect, 'onSuccess', (state, { args: [ requestId ] }) => state.filter((request) => request.requestId !== requestId))
    .on(createFriendRequestEffect, 'onSuccess', (state, { result }) => [ ...state, result ])
    .on(getMyFriendsEffect, 'onSuccess', (_, { result }) => result.requestsIn.filter(isDomainFriendRequest))
    .on(logoutEffect, 'onBefore', () => null);