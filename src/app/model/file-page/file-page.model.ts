import { effect, store } from '@vanyamate/sec';
import {
    getMyFilesAction,
} from '@/app/action/file/getMyFiles/getMyFiles.action.ts';
import { DomainFile, isDomainFile } from 'product-types/dist/file/DomainFile';
import {
    uploadFileAction,
} from '@/app/action/file/uploadFile/uploadFile.action.ts';
import {
    uploadFileProgressAction,
} from '@/app/action/file/uploadFileProgress/uploadFileProgress.action.ts';


export const getMyFilesEffect         = effect(getMyFilesAction);
export const uploadFileEffect         = effect(uploadFileAction);
export const uploadFileProgressEffect = effect(uploadFileProgressAction);

export const $filesUploadList = store<Array<[ File, number ]>>([])
    .on(uploadFileProgressEffect, 'onSuccess', (state, { args: [ file, progress ] }) => {
        for (let i = 0; i < state.length; i++) {
            if (state[i][0] === file) {
                state[i][1] = progress;
                return [ ...state ];
            }
        }
        return state;
    })
    .on(uploadFileEffect, 'onBefore', (state, { args: [ file ] }) => [ [ file, 0 ], ...state ])
    .on(uploadFileEffect, 'onSuccess', (state, { args: [ file ] }) => state.filter(([ f ]) => file !== f));

export const $filesPending = store(false)
    .on(getMyFilesEffect, 'onBefore', () => true)
    .on(getMyFilesEffect, 'onFinally', () => false);

export const $filesList = store<DomainFile[]>([])
    .on(getMyFilesEffect, 'onSuccess', (_, { result }) => result.list.filter(isDomainFile))
    .on(uploadFileEffect, 'onSuccess', (state, { result }) => [ result.file, ...state ]);