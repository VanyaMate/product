import { FC, memo } from 'react';
import {
    ExcelFileUploadForm,
} from '@/entities/excel/ExcelFileUploadForm/ui/ExcelFileUploadForm.tsx';
import {
    $excelFilePending,
    $excelFileUploading,
    $excelFileUploadProgress,
    uploadExcelFileProgressEffect,
    uploadExcelFileToSplitEffect,
} from '@/app/model/excel-splitter/excel-splitter.model.ts';
import { useStore } from '@vanyamate/sec-react';


export type ExcelFileUploadContainerProps = {};

export const ExcelFileUploadContainer: FC<ExcelFileUploadContainerProps> = memo(function ExcelFileUploadContainer () {
    const fileUploading      = useStore($excelFileUploading);
    const fileUploadProgress = useStore($excelFileUploadProgress);
    const fileRefresh        = useStore($excelFilePending);

    return (
        <ExcelFileUploadForm
            onFileSelect={ uploadExcelFileToSplitEffect }
            pending={ fileRefresh }
            process={ fileUploading }
            progress={ fileUploadProgress }
            progressHandler={ uploadExcelFileProgressEffect }
        />
    );
});