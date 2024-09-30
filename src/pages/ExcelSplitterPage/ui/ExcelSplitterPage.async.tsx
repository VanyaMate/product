import {
    ChangeEventHandler,
    ComponentPropsWithoutRef,
    FC,
    memo, useEffect,
} from 'react';
import {
    $excelFileData,
    getExcelFileDataEffect, splitExcelFileEffect,
    uploadExcelFileToSplitEffect,
} from '@/app/model/excel-splitter/excel-splitter.model.ts';
import { useStore } from '@vanyamate/sec-react';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';


// TODO: TEMP
export type ExcelSplitterPageAsyncProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const ExcelSplitterPageAsync: FC<ExcelSplitterPageAsyncProps> = memo(function ExcelSplitterPageAsync (props) {
    const { ...other }     = props;
    const currentExcelData = useStore($excelFileData);

    useEffect(() => {
        getExcelFileDataEffect();
    }, []);

    const onSubmit: ChangeEventHandler<HTMLInputElement> = function (event) {
        const { files } = event.target;
        for (const file of files) {
            uploadExcelFileToSplitEffect(file);
        }
    };

    if (currentExcelData) {
        return (
            <div { ...other }>
                <h2>Sheets</h2>
                {
                    Object.keys(currentExcelData.sheets).map((key) => (
                        <div key={ key }>
                            <h3>Sheet: { key },
                                rows: { currentExcelData.sheets[key].rowsAmount }</h3>
                            {
                                currentExcelData.sheets[key].firstRow.map((col) => (
                                    <Button key={ col }>{ col }</Button>
                                ))
                            }
                        </div>
                    ))
                }
                <ButtonWithLoading onClick={ () => splitExcelFileEffect() }>
                    Make split
                </ButtonWithLoading>
                <h2>Responses</h2>
                {
                    currentExcelData.responses.map((response) => (
                        <div key={ response.path }>
                            <p>sheet: { response.options.selectedSheet }</p>
                            <p>columns: { response.options.selectedColumns }</p>
                            <p>rows per
                                file: { response.options.rowsPerFile }</p>
                            <a
                                download
                                href={ __STATIC__ + '/' + response.path }
                            >
                                download
                            </a>
                        </div>
                    ))
                }
            </div>
        );
    }

    return (
        <div { ...other }>
            <input onChange={ onSubmit } type="file"/>
        </div>
    );
});