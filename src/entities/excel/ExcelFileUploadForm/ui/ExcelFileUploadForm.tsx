import {
    ChangeEventHandler,
    ComponentPropsWithoutRef,
    FC,
    FormEvent,
    memo, useCallback,
} from 'react';
import classNames from 'classnames';
import css from './ExcelFileUploadForm.module.scss';
import { IoSync } from 'react-icons/io5';


export type ExcelFileUploadFormProps =
    {
        onFileSelect: (file: File, progressCallback?: (progress: number) => Promise<any>) => Promise<any>;
        progressHandler?: (progress: number) => Promise<any>;
        process: boolean;
        pending: boolean;
        progress: number;
    }
    & ComponentPropsWithoutRef<'div'>;

export const ExcelFileUploadForm: FC<ExcelFileUploadFormProps> = memo(function ExcelFileUploadForm (props) {
    const {
              className,
              onFileSelect,
              progressHandler,
              process,
              pending,
              progress,
              ...other
          } = props;

    const onSubmitHandler = function (event: FormEvent) {
        event.preventDefault();
    };

    const onInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(function (event) {
        const { files } = event.target;
        for (const file of files) {
            onFileSelect(file, progressHandler);
        }
    }, [ onFileSelect, progressHandler ]);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <form className={ css.form } onSubmit={ onSubmitHandler }>
                <label
                    className={ classNames(css.label, { [css.process]: process }) }
                    htmlFor="upload-excel-file"
                >
                    <span className={ css.text }>
                        {
                            pending
                            ? 'Загрузка'
                            : process
                              ? progress >= 100
                                ? <>
                                    <span>Обработка</span>
                                    <IoSync
                                        className={ css.rotate }
                                    />
                                </>
                                : `${ progress.toFixed(1) } %`
                              : 'Загрузить таблицу'
                        }
                    </span>
                    <div className={ css.progress }>
                        <div className={ css.bar }
                             style={ {
                                 transform: `scaleX(${
                                     process ? progress / 100
                                             : 0
                                 })`,
                             } }/>
                    </div>
                    <input
                        accept="*.xls*"
                        className={ css.input }
                        id="upload-excel-file"
                        name="upload-excel-file"
                        onChange={ onInputChange }
                        type="file"
                    />
                </label>
            </form>
        </div>
    );
});