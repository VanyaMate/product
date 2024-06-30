import { store, effect } from '@vanyamate/sec';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { loginAction } from '@/app/action/auth/login/login.action.ts';
import {
    registrationAction,
} from '@/app/action/auth/registration/registration.action.ts';
import { logoutAction } from '@/app/action/auth/logout/logout.action.ts';
import {
    refreshAuthAction,
} from '@/app/action/auth/refresh-auth/refresh-auth.action.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors';


export const loginEffect        = effect(loginAction);
export const registrationEffect = effect(registrationAction);
export const refreshAuthEffect  = effect(refreshAuthAction);
export const logoutEffect       = effect(logoutAction);

export const authIsPending = store<boolean>(false)
    .on(loginEffect, 'onBefore', () => true)
    .on(registrationEffect, 'onBefore', () => true)
    .on(refreshAuthEffect, 'onBefore', () => true)
    .on(logoutEffect, 'onBefore', () => true)
    .on(loginEffect, 'onFinally', () => false)
    .on(registrationEffect, 'onFinally', () => false)
    .on(refreshAuthEffect, 'onFinally', () => false)
    .on(logoutEffect, 'onFinally', () => false);


export const authError = store<DomainServiceResponseError | null>(null)
    .on(loginEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(registrationEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(refreshAuthEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(logoutEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(loginEffect, 'onSuccess', () => null)
    .on(registrationEffect, 'onSuccess', () => null)
    .on(refreshAuthEffect, 'onSuccess', () => null)
    .on(logoutEffect, 'onBefore', () => null);


export const authUser = store<DomainUser | null>(null)
    .on(loginEffect, 'onSuccess', (_, { result }) => result.user)
    .on(registrationEffect, 'onSuccess', (_, { result }) => result.user)
    .on(refreshAuthEffect, 'onSuccess', (_, { result }) => result)
    .on(logoutEffect, 'onBefore', () => null);