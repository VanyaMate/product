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
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    ExcelFileSheetTabsContainer,
} from '@/widgets/excel/container/ExcelFileSheetTabsContainer/ui/ExcelFileSheetTabsContainer.tsx';
import {
    ExcelFileResponsesBox,
} from '@/entities/excel/ExcelFileResponsesBox/ui/ExcelFileResponsesBox.tsx';


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
            <ExcelFileSheetTabsContainer sheets={ currentExcelFile.sheets }/>
            <ExcelFileResponsesBox responses={ currentExcelFile.responses }/>
        </Col>
    );
});