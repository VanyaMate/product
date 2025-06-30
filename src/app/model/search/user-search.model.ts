import { effect, pending, store, to } from '@vanyamate/sec';
import {
    DomainUserWithPermissions, isDomainUserWithPermissions,
} from 'product-types/dist/user/DomainUserWithPermissions';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    getUsersByLoginStartAction,
} from '@/app/action/users/getUsersByLoginStart/getUsersByLoginStart.action.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';
import { loginMarker, logoutMarker } from '@/app/model/auth/auth.model.ts';


export const searchUsersByLoginStartEffect = effect(getUsersByLoginStartAction);


export const $usersSearchIsPending = pending([ searchUsersByLoginStartEffect ])
    .disableOn(logoutMarker, false)
    .enableOn(loginMarker, false);


export const $usersSearchError = store<DomainServiceResponseError | null>(null)
    .disableOn(logoutMarker, null)
    .enableOn(loginMarker, null)
    .on(searchUsersByLoginStartEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(searchUsersByLoginStartEffect, 'onSuccess', to(null));


export const $usersSearch = store<Array<DomainUserWithPermissions>>([])
    .disableOn(logoutMarker, [])
    .enableOn(loginMarker, [])
    .on(searchUsersByLoginStartEffect, 'onSuccess', (_, { result }) => result.list.filter(isDomainUserWithPermissions));


export const $usersSearchCount = store<number>(0)
    .disableOn(logoutMarker, 0)
    .enableOn(loginMarker, 0)
    .on(searchUsersByLoginStartEffect, 'onSuccess', (_, { result }) => result.count);