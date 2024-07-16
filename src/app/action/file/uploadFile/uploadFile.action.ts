// TODO: Continue
import {
    createXhrWithInterceptors,
} from '@/app/lib/xhr/create-xhr-with-interceptors.ts';
import { LOCAL_STORAGE_USER_ACCESS_TOKEN } from '@/app/model/auth/const.ts';


export const uploadFileAction = async (file: File) => {
    const data = new FormData();
    data.append('file', file, file.name);

    try {
        const xhr = createXhrWithInterceptors([], []);

        xhr(__API__ + '/v1/file', {
            method          : 'POST',
            body            : data,
            headers         : {
                authorization: localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN),
            },
            onUploadProgress: (progress) => console.log(`Up for ${ file.name } to ${ progress }`),
        }).then((xhr) => console.log('finish', xhr));

    } catch (error) {
        console.error('Error uploading file:', error);
    }
};