import { ComponentPropsWithoutRef, FC, memo, useMemo, useState } from 'react';
import classNames from 'classnames';
import css from './ExcelFileSheetTabsContainer.module.scss';
import {
    DomainExcelFileSheetData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSheetData';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ExcelFileSplitForm,
} from '@/entities/excel/ExcelFileSplitForm/ui/ExcelFileSplitForm.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';


export type ExcelFileSheetTabsContainerProps =
    {
        sheets: Record<string, DomainExcelFileSheetData>;
    }
    & ComponentPropsWithoutRef<'section'>;

export const ExcelFileSheetTabsContainer: FC<ExcelFileSheetTabsContainerProps> = memo(function ExcelFileSheetTabsContainer (props) {
    const { className, sheets, ...other }     = props;
    const keys                                = useMemo(() => Object.keys(sheets), [ sheets ]);
    const [ selectedSheet, setSelectedSheet ] = useState<string>(keys[0]);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Col className={ css.sheets }>
                <h4>Таблицы</h4>
                <Row>
                    {
                        keys.map((key, index) => (
                            <Button
                                key={ index }
                                onClick={ () => setSelectedSheet(key) }
                                styleType={ key === selectedSheet
                                            ? ButtonStyleType.PRIMARY
                                            : ButtonStyleType.GHOST }
                            >
                                { key }
                            </Button>
                        ))
                    }
                </Row>
            </Col>
            <ExcelFileSplitForm
                columns={ sheets[selectedSheet].firstRow }
                rowsAmount={ sheets[selectedSheet].rowsAmount }
                sheet={ selectedSheet }
            />
        </section>
    );
});