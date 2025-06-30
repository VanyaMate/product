import { effect, store, pending, to, result } from '@vanyamate/sec';
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
import {
    loginMarker,
    logoutMarker,
} from '@/app/model/auth/auth.model.ts';


export const uploadExcelFileToSplitEffect  = effect(uploadExcelFileToSplitAction);
export const getExcelFileDataEffect        = effect(getExcelFileDataAction);
export const splitExcelFileEffect          = effect(splitExcelFileAction);
export const uploadExcelFileProgressEffect = effect(uploadExcelFileProgressAction);
export const clearExcelFileEffect          = effect(clearExcelFileAction);

export const $excelFileUploading = pending([ uploadExcelFileToSplitEffect ])
    .disableOn(logoutMarker, false)
    .enableOn(loginMarker, false);


export const $excelFileUploadProgress = store<number>(0)
    .disableOn(logoutMarker, 0)
    .enableOn(loginMarker, 0)
    .on(uploadExcelFileProgressEffect, 'onSuccess', result());

export const $excelFilePending = pending([ getExcelFileDataEffect ])
    .disableOn(logoutMarker, false)
    .enableOn(loginMarker, false);

export const $excelFileData = store<DomainExcelFileData>(null)
    .disableOn(logoutMarker, null)
    .enableOn(loginMarker, null)
    .on(uploadExcelFileToSplitEffect, 'onBefore', to(null))
    .on(uploadExcelFileToSplitEffect, 'onSuccess', result())
    .on(getExcelFileDataEffect, 'onSuccess', result())
    .on(splitExcelFileEffect, 'onSuccess', (state, { result }) => ({
        ...state, responses: [ ...state.responses, result ],
    }))
    .on(clearExcelFileEffect, 'onFinally', to(null));