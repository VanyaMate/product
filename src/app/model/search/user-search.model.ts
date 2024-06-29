import { effect, store } from '@vanyamate/sec';
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


export const searchUsersByLoginStartEffect = effect(getUsersByLoginStartAction);


export const usersSearchIsPending = store<boolean>(false)
    .on(searchUsersByLoginStartEffect, 'onBefore', () => true)
    .on(searchUsersByLoginStartEffect, 'onFinally', () => false);


export const usersSearchError = store<DomainServiceResponseError | null>(null)
    .on(searchUsersByLoginStartEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(searchUsersByLoginStartEffect, 'onSuccess', () => null);


export const usersSearch = store<Array<DomainUserWithPermissions>>([])
    .on(searchUsersByLoginStartEffect, 'onSuccess', (_, { result }) => result.list.filter(isDomainUserWithPermissions));


export const usersSearchCount = store<number>(0)
    .on(searchUsersByLoginStartEffect, 'onSuccess', (_, { result }) => result.count);