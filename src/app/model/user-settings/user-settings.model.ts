import { effect, pending, result, store } from '@vanyamate/sec';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    getUserDataByLoginAction,
} from '@/app/action/users/getUserDataByLogin/getUserDataByLogin.action.ts';
import {
    $authUser,
    loginMarker,
    logoutMarker,
} from '@/app/model/auth/auth.model.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';


export const uploadUserSettings = effect(() => getUserDataByLoginAction($authUser.get().login));

export const $userSettingsPending = pending([ uploadUserSettings ])
    .disableOn(logoutMarker, false)
    .enableOn(loginMarker, false);

export const $userSettingsData = store<DomainUserFull | null>(null)
    .disableOn(logoutMarker, null)
    .enableOn(loginMarker, null)
    .on(uploadUserSettings, 'onSuccess', result());

export const $userSettingsError = store<DomainServiceResponseError | null>(null)
    .disableOn(logoutMarker, null)
    .enableOn(loginMarker, null)
    .on(uploadUserSettings, 'onError', (_, { error }) => returnValidErrors(error));