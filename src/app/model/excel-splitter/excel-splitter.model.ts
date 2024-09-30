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


export const uploadExcelFileToSplitEffect = effect(uploadExcelFileToSplitAction);
export const getExcelFileDataEffect       = effect(getExcelFileDataAction);
export const splitExcelFileEffect         = effect(splitExcelFileAction);

export const $excelFileData = store<DomainExcelFileData>(null)
    .on(uploadExcelFileToSplitEffect, 'onBefore', () => null)
    .on(uploadExcelFileToSplitEffect, 'onSuccess', (_, { result }) => result)
    .on(getExcelFileDataEffect, 'onSuccess', (_, { result }) => result)
    .on(splitExcelFileEffect, 'onSuccess', (state, { result }) => ({
        ...state, responses: [ ...state.responses, result ],
    }));