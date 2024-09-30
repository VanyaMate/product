import { request } from '@/app/lib/fetch/request.ts';
import {
    isDomainExcelFileData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileData';


export const getExcelFileDataAction = function () {
    return request(
        `v1/excel`,
        {
            method: 'GET',
        },
        isDomainExcelFileData,
    );
};