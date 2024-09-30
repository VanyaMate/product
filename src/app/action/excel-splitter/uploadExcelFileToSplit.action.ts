import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainExcelFileData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileData';


export const uploadExcelFileToSplitAction = function (file: File, onProgressCallback?: (progress: number) => void) {
    const data = new FormData();
    data.append('file', file, file.name);

    return request(
        `v1/excel`,
        {
            method          : 'POST',
            isJson          : false,
            body            : data,
            onUploadProgress: onProgressCallback,
        },
        isDomainExcelFileData,
    );
};