import { effect } from '@vanyamate/sec';
import {
    uploadExcelFileToSplitAction,
} from '@/app/action/excel-splitter/uploadExcelFileToSplit.action.ts';


export const uploadExcelFileToSplitEffect = effect(uploadExcelFileToSplitAction);