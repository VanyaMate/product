import {
    ChangeEventHandler,
    ComponentPropsWithoutRef,
    FC,
    memo,
} from 'react';
import {
    uploadExcelFileToSplitEffect,
} from '@/app/model/excel-splitter/excel-splitter.model.ts';


export type ExcelSplitterPageAsyncProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const ExcelSplitterPageAsync: FC<ExcelSplitterPageAsyncProps> = memo(function ExcelSplitterPageAsync (props) {
    const { ...other }                                   = props;
    const onSubmit: ChangeEventHandler<HTMLInputElement> = function (event) {
        const { files } = event.target;
        for (const file of files) {
            uploadExcelFileToSplitEffect(file);
        }
    };

    return (
        <div { ...other }>
            <input onChange={ onSubmit } type="file"/>
        </div>
    );
});