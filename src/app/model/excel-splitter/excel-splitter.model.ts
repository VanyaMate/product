import { effect, store } from '@vanyamate/sec';
import {
    uploadExcelFileToSplitAction,
} from '@/app/action/excel-splitter/uploadExcelFileToSplit.action.ts';
import {
    DomainExcelFileData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileData';
import {
    getExcelFileDataAction,
} from '@/app/action/excel-splitter/getExcelFileData.action.ts';
import {
    splitExcelFileAction,
} from '@/app/action/excel-splitter/splitExcelFile.action.ts';
import {
    uploadExcelFileProgressAction,
} from '@/app/action/excel-splitter/uploadExcelFileProgress.action.ts';
import {
    clearExcelFileAction,
} from '@/app/action/excel-splitter/clearExcelFile.action.ts';


export const uploadExcelFileToSplitEffect  = effect(uploadExcelFileToSplitAction);
export const getExcelFileDataEffect        = effect(getExcelFileDataAction);
export const splitExcelFileEffect          = effect(splitExcelFileAction);
export const uploadExcelFileProgressEffect = effect(uploadExcelFileProgressAction);
export const clearExcelFileEffect          = effect(clearExcelFileAction);

export const $excelFileUploading = store<boolean>(false)
    .on(uploadExcelFileToSplitEffect, 'onBefore', () => true)
    .on(uploadExcelFileToSplitEffect, 'onFinally', () => false);

export const $excelFileUploadProgress = store<number>(0)
    .on(uploadExcelFileProgressEffect, 'onSuccess', (_, { result }) => result);

export const $excelFilePending = store<boolean>(false)
    .on(getExcelFileDataEffect, 'onBefore', () => true)
    .on(getExcelFileDataEffect, 'onFinally', () => false);

export const $excelFileData = store<DomainExcelFileData>(null)
    .on(uploadExcelFileToSplitEffect, 'onBefore', () => null)
    .on(uploadExcelFileToSplitEffect, 'onSuccess', (_, { result }) => result)
    .on(getExcelFileDataEffect, 'onSuccess', (_, { result }) => result)
    .on(splitExcelFileEffect, 'onSuccess', (state, { result }) => ({
        ...state, responses: [ ...state.responses, result ],
    }))
    .on(clearExcelFileEffect, 'onFinally', () => null);