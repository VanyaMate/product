import { effect, store } from '@vanyamate/sec';
import {
    getMyFilesAction,
} from '@/app/action/file/getMyFiles/getMyFiles.action.ts';
import { DomainFile, isDomainFile } from 'product-types/dist/file/DomainFile';


export const getMyFilesEffect = effect(getMyFilesAction);

export const $filesPending = store(false)
    .on(getMyFilesEffect, 'onBefore', () => true)
    .on(getMyFilesEffect, 'onFinally', () => false);

export const $filesList = store<DomainFile[]>([])
    .on(getMyFilesEffect, 'onSuccess', (_, { result }) => result.list.filter(isDomainFile));