import { effect, store, pending, result, to } from '@vanyamate/sec';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    getUserDataByLoginAction,
} from '@/app/action/users/getUserDataByLogin/getUserDataByLogin.action.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';
import { loginMarker, logoutMarker } from '@/app/model/auth/auth.model.ts';


export const getUserPageDataEffect = effect(getUserDataByLoginAction);


export const $userPageIsPending = pending([ getUserPageDataEffect ])
    .disableOn(logoutMarker, false)
    .enableOn(loginMarker, false);


export const $userPageError = store<DomainServiceResponseError | null>(null)
    .disableOn(logoutMarker, null)
    .enableOn(loginMarker, null)
    .on(getUserPageDataEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(getUserPageDataEffect, 'onSuccess', to(null));


export const $userPageData = store<DomainUserFull | null>(null)
    .disableOn(logoutMarker, null)
    .enableOn(loginMarker, null)
    .on(getUserPageDataEffect, 'onBefore', (state, { args: [ login ] }) => {
        if (state?.login !== login) {
            return null;
        }
        return state;
    })
    .on(getUserPageDataEffect, 'onSuccess', result());