import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
} from 'react';
import classNames from 'classnames';
import css from './ExcelFileSplitForm.module.scss';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    splitExcelFileEffect,
} from '@/app/model/excel-splitter/excel-splitter.model.ts';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useForm } from 'react-hook-form';
import {
    DomainExcelFileSplitData,
} from 'product-types/dist/excel/excel-split/DomainExcelFileSplitData';
import { Checkbox } from '@/shared/ui-kit/input/Checkbox/ui/Checkbox.tsx';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';

// TODO: После добавления новой системы форм - обновить эту

export type ExcelFileSplitFormProps =
    {
        sheet: string;
        columns: Array<string>;
        rowsAmount: number;
    }
    & ComponentPropsWithoutRef<'form'>;

export const ExcelFileSplitForm: FC<ExcelFileSplitFormProps> = memo(function ExcelFileSplitForm (props) {
    const { className, columns, rowsAmount, ...other } = props;
    const {
              register,
              handleSubmit,
              setValue,
              formState,
          }                                                   = useForm<DomainExcelFileSplitData>();
    const onSubmit                                            = useCallback((data: DomainExcelFileSplitData) => {
        return splitExcelFileEffect(data);
    }, []);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <Col className={ css.item }>
                <h4>Информация</h4>
                <div className={ css.info }>
                    <p className={ css.row }>
                        <span className={ css.rowLabel }>Строк:</span>
                        { rowsAmount }
                    </p>
                </div>
            </Col>
            <Col className={ css.item }>
                <Row>
                    <h4>Столбцы</h4>
                    <Button
                        onClick={ () => setValue('selectedColumns', columns) }
                        size={ ButtonSizeType.SMALL }
                        styleType={ ButtonStyleType.GHOST }
                    >
                        Выделить все
                    </Button>
                    <Button
                        onClick={ () => setValue('selectedColumns', []) }
                        size={ ButtonSizeType.SMALL }
                        styleType={ ButtonStyleType.GHOST }
                    >
                        Снять выделение
                    </Button>
                </Row>
                <Row>
                    {
                        columns.map((col, index) => (
                            <Checkbox
                                key={ index }
                                label={ col }
                                value={ col }
                                { ...register('selectedColumns', {
                                    required: true,
                                }) }
                            />
                        ))
                    }
                </Row>
            </Col>
            <Col className={ css.item }>
                <h4>Настройки</h4>
                <TextInput
                    label="Строк в файле"
                    placeholder="Введите колличество строк в файле"
                    required
                    type="number"
                    { ...register('rowsPerFile', {
                        valueAsNumber: true,
                        required     : true,
                    }) }
                />
            </Col>
            <Col className={ css.item }>
                <ButtonWithLoading
                    disabled={ !formState.isValid }
                    loading={ formState.isSubmitting }
                    type="submit"
                >
                    { formState.isSubmitting ? 'Обработка' : 'Обработать' }
                </ButtonWithLoading>
            </Col>
        </form>
    );
});