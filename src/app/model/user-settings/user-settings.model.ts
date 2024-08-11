import { effect, store } from '@vanyamate/sec';
import { DomainUserFull } from 'product-types/dist/user/DomainUserFull';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    getUserDataByLoginAction,
} from '@/app/action/users/getUserDataByLogin/getUserDataByLogin.action.ts';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';


export const uploadUserSettings = effect(() => getUserDataByLoginAction($authUser.get().login));

export const $userSettingsPending = store<boolean>(false)
    .on(uploadUserSettings, 'onBefore', () => true)
    .on(uploadUserSettings, 'onFinally', () => false);

export const $userSettingsData = store<DomainUserFull | null>(null)
    .on(uploadUserSettings, 'onSuccess', (_, { result }) => result);

export const $userSettingsError = store<DomainServiceResponseError | null>(null)
    .on(uploadUserSettings, 'onError', (_, { error }) => returnValidErrors(error));