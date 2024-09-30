import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainExcelFileSplitResponse,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitResponse';


export const splitExcelFileAction = function () {
    return request(
        `v1/excel/split`,
        {
            method: 'POST',
            body  : JSON.stringify({
                rowsPerFile    : 200,
                selectedSheet  : 'Sheet1',
                selectedColumns: ['Телефон'],
            }),
            isJson: true,
        },
        isDomainExcelFileSplitResponse,
    );
};