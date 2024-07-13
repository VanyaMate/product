import { effect, store } from '@vanyamate/sec';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    getUserDataByLoginAction,
} from '@/app/action/users/getUserDataByLogin/getUserDataByLogin.action.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';


export const getUserPageDataEffect = effect(getUserDataByLoginAction);


export const $userPageIsPending = store<boolean>(false)
    .on(getUserPageDataEffect, 'onBefore', () => true)
    .on(getUserPageDataEffect, 'onFinally', () => false);


export const $userPageError = store<DomainServiceResponseError | null>(null)
    .on(getUserPageDataEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(getUserPageDataEffect, 'onSuccess', () => null);


export const $userPageData = store<DomainUserFull | null>(null)
    .on(getUserPageDataEffect, 'onBefore', (state, { args: [ login ] }) => {
        if (state?.login !== login) {
            return null;
        }
        return state;
    })
    .on(getUserPageDataEffect, 'onSuccess', (_, { result }) => result);