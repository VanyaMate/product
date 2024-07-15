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
    FilePreload,
} from '@/entities/file/item/FilePreload/ui/FilePreload.tsx';
import { useTranslation } from 'react-i18next';
import {
    uploadFileAction,
} from '@/app/action/file/uploadFile/uploadFile.action.ts';


export type FileUploadFormProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FileUploadForm: FC<FileUploadFormProps> = memo(function FileUploadForm (props) {
    const { className, ...other }               = props;
    const [ dragFileAmount, setDragFileAmount ] = useState<number>(0);
    // TODO: Temp (перенести в модель)
    const [ files, setFiles ]                   = useState<File[]>([]);
    const { t }                                 = useTranslation([ 'files-page' ]);

    // TODO: Continue

    const onDropOver: DragEventHandler = useCallback((event) => {
        console.log('onDropOver', event);
        setDragFileAmount(event.dataTransfer.items.length);
    }, []);

    const onDragEnter: DragEventHandler = useCallback((event) => {
        console.log('onDragEnter', event);
        setDragFileAmount(event.dataTransfer.items.length);
    }, []);

    const onDragExit: DragEventHandler = useCallback((event) => {
        console.log('onDragExit', event);
        setDragFileAmount(0);
    }, []);

    const onDragEnd: DragEventHandler = useCallback((event) => {
        console.log('onDragEnd', event);
        setDragFileAmount(0);
    }, []);

    const onSubmit: FormEventHandler = useCallback((event) => {
        event.preventDefault();
    }, []);

    const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(function (event) {
        const { files } = event.target;
        uploadFileAction(files.item(0));
        setFiles((prev) => [ ...Array.from(files), ...prev ]);
    }, []);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <form
                action="http://localhost:3000/api/v1/file"
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
                            ? t('upload_files', { amount: dragFileAmount })
                            : t('select_files')
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
            {
                files.length
                ? <section className={ css.preload }>
                    <h2 className={ css.title }>{ t('files_preload_title') }</h2>
                    <div className={ css.list }>
                        {
                            files.map((file, index) => (
                                <FilePreload
                                    key={ index }
                                    progress={ index * 13 }
                                    size={ file.size }
                                    title={ file.name }
                                    type={ file.type }
                                />
                            ))
                        }
                    </div>
                </section>
                : null
            }
        </div>
    );
});