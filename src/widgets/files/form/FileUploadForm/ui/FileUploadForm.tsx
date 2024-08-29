import {
    ChangeEventHandler,
    ComponentPropsWithoutRef,
    DragEventHandler,
    FC, FormEventHandler,
    memo,
    useCallback,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './FileUploadForm.module.scss';
import {
    uploadFileEffect, uploadFileProgressEffect,
} from '@/app/model/file-page/file-page.model.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type FileUploadFormProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FileUploadForm: FC<FileUploadFormProps> = memo(function FileUploadForm (props) {
    const { className, ...other }               = props;
    const [ dragFileAmount, setDragFileAmount ] = useState<number>(0);
    const { t, replace }                        = useTranslation();

    const onDropOver: DragEventHandler = useCallback((event) => {
        setDragFileAmount(event.dataTransfer.items.length);
    }, []);

    const onDragEnter: DragEventHandler = useCallback((event) => {
        setDragFileAmount(event.dataTransfer.items.length);
    }, []);

    const onDragExit: DragEventHandler = useCallback(() => {
        setDragFileAmount(0);
    }, []);

    const onDragEnd: DragEventHandler = useCallback(() => {
        setDragFileAmount(0);
    }, []);

    const onSubmit: FormEventHandler = useCallback((event) => {
        event.preventDefault();
    }, []);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(function (event) {
        const { files } = event.target;
        for (const file of files) {
            uploadFileEffect(file, (progress) => uploadFileProgressEffect(file, progress));
        }
    }, []);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <form
                action={ __API__ + `/v1/file` }
                className={ css.form }
                method="post"
                onDragEnd={ onDragEnd }
                onDragEnter={ onDragEnter }
                onDragExit={ onDragExit }
                onDrop={ onDropOver }
                onSubmit={ onSubmit }
            >
                <label
                    className={ classNames(css.label, { [css.dragOver]: dragFileAmount }) }
                >
                    <span className={ css.text }>
                        {
                            dragFileAmount
                            ? replace(t.page.files.upload_files, { amount: dragFileAmount.toString() })
                            : t.page.files.select_files
                        }
                    </span>
                    <input
                        className={ css.input }
                        multiple
                        onChange={ onInputChange }
                        type="file"
                    />
                </label>
            </form>
        </div>
    );
});