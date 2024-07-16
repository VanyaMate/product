import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import css from './FilesContainer.module.scss';
import {
    getMyFilesEffect,
} from '@/app/model/file-page/file-page.model.ts';
import {
    FileUploadForm,
} from '@/widgets/files/form/FileUploadForm/ui/FileUploadForm.tsx';
import {
    FilesUploadInsert,
} from '@/widgets/files/insert/FilesUploadInsert/ui/FilesUploadInsert.tsx';
import {
    FilesInsert,
} from '@/widgets/files/insert/FilesInsert/ui/FilesInsert.tsx';


export type FilesContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FilesContainer: FC<FilesContainerProps> = memo(function FilesContainer (props) {
    const { className, ...other } = props;

    useLayoutEffect(() => {
        getMyFilesEffect({});
    }, []);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <FileUploadForm/>
            <div className={ css.list }>
                <FilesUploadInsert/>
                <FilesInsert/>
            </div>
        </div>
    );
});