import { request } from '@/app/lib/fetch/request.ts';
import { isDomainFile } from 'product-types/dist/file/DomainFile';


export const getFileByIdAction = (fileId: string) =>
    request(
        `v1/files/${ fileId }`,
        { method: 'GET' },
        isDomainFile,
    );