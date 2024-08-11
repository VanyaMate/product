import { store, effect } from '@vanyamate/sec';
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

export const $authIsPending = store<boolean>(false)
    .on(loginEffect, 'onBefore', () => true)
    .on(registrationEffect, 'onBefore', () => true)
    .on(refreshAuthEffect, 'onBefore', () => true)
    .on(logoutEffect, 'onBefore', () => true)
    .on(loginEffect, 'onFinally', () => false)
    .on(registrationEffect, 'onFinally', () => false)
    .on(refreshAuthEffect, 'onFinally', () => false)
    .on(logoutEffect, 'onFinally', () => false);


export const $authError = store<DomainServiceResponseError | null>(null)
    .on(loginEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(registrationEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(refreshAuthEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(logoutEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(loginEffect, 'onSuccess', () => null)
    .on(registrationEffect, 'onSuccess', () => null)
    .on(refreshAuthEffect, 'onSuccess', () => null)
    .on(logoutEffect, 'onBefore', () => null);


export const $authUser = store<DomainUserFull | null>(null)
    .on(loginEffect, 'onSuccess', (_, { result }) => result.user)
    .on(registrationEffect, 'onSuccess', (_, { result }) => result.user)
    .on(refreshAuthEffect, 'onSuccess', (_, { result }) => result)
    .on(logoutEffect, 'onBefore', () => null)
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