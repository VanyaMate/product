import { store, effect, pending, to, marker, result } from '@vanyamate/sec';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import { loginAction } from '@/app/action/auth/login/login.action.ts';
import {
    registrationAction,
} from '@/app/action/auth/registration/registration.action.ts';
import { logoutAction } from '@/app/action/auth/logout/logout.action.ts';
import {
    refreshAuthAction,
} from '@/app/action/auth/refresh-auth/refresh-auth.action.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors';
import {
    userAvatarUpdateAction,
} from '@/app/action/user-settings/userAvatarUpdate/userAvatarUpdate.action.ts';
import {
    userLoginUpdateAction,
} from '@/app/action/user-settings/userLoginUpdate/userLoginUpdate.action.ts';
import {
    userPasswordUpdateAction,
} from '@/app/action/user-settings/userPasswordUpdate/userPasswordUpdate.action.ts';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    userBackgroundUpdateAction,
} from '@/app/action/user-settings/userBackgroundUpdate/userBackgroundUpdate.action.ts';


export const loginEffect                = effect(loginAction);
export const registrationEffect         = effect(registrationAction);
export const refreshAuthEffect          = effect(refreshAuthAction);
export const logoutEffect               = effect(logoutAction);
export const userAvatarUpdateEffect     = effect(userAvatarUpdateAction);
export const userLoginUpdateEffect      = effect(userLoginUpdateAction);
export const userPasswordUpdateEffect   = effect(userPasswordUpdateAction);
export const userBackgroundUpdateEffect = effect(userBackgroundUpdateAction);

export const loginMarker  = marker('beforeAll')
    .on('onSuccess', loginEffect)
    .on('onSuccess', registrationEffect)
    .on('onSuccess', refreshAuthEffect);
export const logoutMarker = marker('afterAll')
    .on('onSuccess', logoutEffect);

export const $authIsPending = pending([ loginEffect, registrationEffect, refreshAuthEffect, logoutEffect ])
    .disableOn(logoutMarker, false)
    .enableOn(loginMarker, false);


export const $authError = store<DomainServiceResponseError | null>(null)
    .disableOn(logoutMarker, null)
    .enableOn(loginMarker, null)
    .on(loginEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(registrationEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(refreshAuthEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(logoutEffect, 'onError', (_, { error }) => returnValidErrors(error));


export const $authUser = store<DomainUserFull | null>(null)
    .on(loginEffect, 'onSuccess', (_, { result }) => result.user)
    .on(registrationEffect, 'onSuccess', (_, { result }) => result.user)
    .on(refreshAuthEffect, 'onSuccess', result())
    .on(logoutEffect, 'onBefore', to(null))
    .on(
        userAvatarUpdateEffect,
        'onSuccess',
        (state, { result }) => ({
            ...state, ...result.newUser,
        }),
    )
    .on(
        userLoginUpdateEffect,
        'onSuccess',
        (state, { result }) => ({
            ...state, ...result.newUser,
        }),
    )
    .on(
        userBackgroundUpdateEffect,
        'onSuccess',
        (state, { result }) => ({
            ...state, background: result.currentBackground,
        }),
    );