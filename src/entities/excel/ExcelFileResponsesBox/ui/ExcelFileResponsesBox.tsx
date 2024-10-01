import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './ExcelFileResponsesBox.module.scss';
import {
    DomainExcelFileSplitResponse,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitResponse';
import {
    ExcelFileResponseCard,
} from '@/entities/excel/ExcelFileResponseCard/ui/ExcelFileResponseCard.tsx';


export type ExcelFileResponsesBoxProps =
    {
        responses: Array<DomainExcelFileSplitResponse>;
    }
    & ComponentPropsWithoutRef<'section'>;

export const ExcelFileResponsesBox: FC<ExcelFileResponsesBoxProps> = memo(function ExcelFileResponsesBox (props) {
    const { className, responses, ...other } = props;

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h3>Сплиты</h3>
            <div className={ css.content }>
                {
                    responses.map((response) => (
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
            </div>
        </section>
    );
});