import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import css from './FilesContainer.module.scss';
import {
    FilePreview,
} from '@/entities/file/item/FilePreview/ui/FilePreview.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $filesList,
    $filesPending, getMyFilesEffect,
} from '@/app/model/file-page/file-page.model.ts';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    FileUploadForm,
} from '@/entities/file/form/FileUploadForm/ui/FileUploadForm.tsx';


export type FilesContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FilesContainer: FC<FilesContainerProps> = memo(function FilesContainer (props) {
    const { className, ...other } = props;
    const filesPending            = useStore($filesPending);
    const filesList               = useStore($filesList);

    useLayoutEffect(() => {
        getMyFilesEffect({});
    }, []);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            {
                // TODO: Continue
            }
            <FileUploadForm/>
            <div className={ css.list }>
                {
                    filesPending ? <PageLoader/>
                                 : filesList.map((file) => (
                                     <FilePreview file={ file } key={ file.id }/>
                                 ))
                }
            </div>
        </div>
    );
});