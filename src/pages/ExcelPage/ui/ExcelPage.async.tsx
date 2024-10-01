import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $excelFileData, clearExcelFileEffect, getExcelFileDataEffect,
} from '@/app/model/excel-splitter/excel-splitter.model.ts';
import {
    ExcelFileUploadContainer,
} from '@/widgets/excel/container/ExcelFileUploadContainer/ui/ExcelFileUploadContainer.tsx';
import {
    ExcelFileHeader,
} from '@/entities/excel/ExcelFileHeader/ui/ExcelFileHeader.tsx';
import {
    ExcelFileResponseCard,
} from '@/entities/excel/ExcelFileResponseCard/ui/ExcelFileResponseCard.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    ExcelFileSplitForm,
} from '@/entities/excel/ExcelFileSplitForm/ui/ExcelFileSplitForm.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


export type ExcelPageAsyncProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const ExcelPageAsync: FC<ExcelPageAsyncProps> = memo(function ExcelPageAsync (props) {
    const currentExcelFile = useStore($excelFileData);

    useLayoutEffect(() => {
        getExcelFileDataEffect();
    }, []);

    if (!currentExcelFile) {
        return <ExcelFileUploadContainer/>;
    }

    return (
        <Col { ...props }>
            <ExcelFileHeader
                clearFile={ clearExcelFileEffect }
                fileName={ currentExcelFile.fileName }
            />
            <h4>Таблица</h4>
            <Row>
                {
                    Object.keys(currentExcelFile.sheets).map((sheet, index) => (
                        <Button key={ index }>{ sheet }</Button>
                    ))
                }
            </Row>
            <ExcelFileSplitForm
                columns={ currentExcelFile.sheets['Sheet1'].firstRow }
            />
            <Row>
                {
                    currentExcelFile.responses.map((response) => (
                        <ExcelFileResponseCard
                            fileName={ response.fileName }
                            filePath={ __STATIC__ + '/' + response.path }
                            fileSize={ response.fileSize }
                            key={ response.path }
                            rowsPerFile={ response.options.rowsPerFile }
                            selectedColumns={ response.options.selectedColumns }
                            selectedSheet={ response.options.selectedSheet }
                        />
                    ))
                }
            </Row>
        </Col>
    );
});