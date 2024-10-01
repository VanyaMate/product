import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainExcelFileSplitResponse,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitResponse';


export const splitExcelFileAction = function (rows: number, sheet: string, columns: Array<string>) {
    return request(
        `v1/excel/split`,
        {
            method: 'POST',
            body  : JSON.stringify({
                rowsPerFile    : rows,
                selectedSheet  : sheet,
                selectedColumns: columns,
            }),
            isJson: true,
        },
        isDomainExcelFileSplitResponse,
    );
};