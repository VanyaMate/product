import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainExcelFileSplitResponse,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitResponse';
import {
    DomainExcelFileSplitData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitData';


export const splitExcelFileAction = function (data: DomainExcelFileSplitData) {
    return request(
        `v1/excel/split`,
        {
            method: 'POST',
            body  : JSON.stringify(data),
            isJson: true,
        },
        isDomainExcelFileSplitResponse,
    );
};