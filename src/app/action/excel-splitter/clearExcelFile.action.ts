import { request } from '@/app/lib/fetch/request.ts';


export const clearExcelFileAction = function () {
    return request(
        `v1/excel`,
        {
            method: 'DELETE',
        },
        (data: unknown): data is boolean => data === true,
    );
};