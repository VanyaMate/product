import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useEffect,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './ExcelFileSplitForm.module.scss';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
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

// TODO: После добавления новой системы форм - обновить эту

export type ExcelFileSplitFormProps =
    {
        sheet: string;
        columns: Array<string>;
        rowsAmount: number;
    }
    & ComponentPropsWithoutRef<'form'>;

export const ExcelFileSplitForm: FC<ExcelFileSplitFormProps> = memo(function ExcelFileSplitForm (props) {
    const { className, columns, sheet, rowsAmount, ...other } = props;
    const rowsPerFileInput                                    = useInputWithError({
        name: 'rows',
    });
    const formController                                      = useForm<{
        rows: string
    }>({
        inputs  : [ rowsPerFileInput ],
        onSubmit: async (data) => {
            const selectedCheckboxes = checkboxes
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);

            if (selectedCheckboxes.length) {
                return splitExcelFileEffect(parseInt(data.rows), sheet, selectedCheckboxes).then();
            }
        },
    });
    const [ checkboxes, setCheckboxes ]                       = useState<Array<HTMLInputElement>>([]);

    useEffect(() => {
        setCheckboxes([ ...rowsPerFileInput.inputRef.current?.form.querySelectorAll('input[type="checkbox"]') ?? [] ] as Array<HTMLInputElement>);
    }, [ rowsPerFileInput.inputRef, columns ]);

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ formController }
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
                        onClick={ () => checkboxes.forEach((checkbox) => checkbox.checked = true) }
                        size={ ButtonSizeType.SMALL }
                        styleType={ ButtonStyleType.GHOST }
                    >
                        Выделить все
                    </Button>
                    <Button
                        onClick={ () => checkboxes.forEach((checkbox) => checkbox.checked = false) }
                        size={ ButtonSizeType.SMALL }
                        styleType={ ButtonStyleType.GHOST }
                    >
                        Снять выделение
                    </Button>
                </Row>
                <Row>
                    {
                        columns.map((col, index) => (
                            <label className={ css.label } key={ col + index }>
                                <input
                                    defaultChecked={ true }
                                    type="checkbox"
                                    value={ col }
                                />
                                <span>
                                    { col }
                                </span>
                            </label>
                        ))
                    }
                </Row>
            </Col>
            <Col className={ css.item }>
                <h4>Настройки</h4>
                <InputWithError
                    controller={ rowsPerFileInput }
                    label="Строк в файле"
                    placeholder="Введите колличество строк в файле"
                    type="number"
                />
            </Col>
            <Col className={ css.item }>
                <ButtonWithLoading
                    disabled={ !formController.canBeSubmitted }
                    loading={ formController.pending }
                    type="submit"
                >
                    { formController.pending ? 'Обработка' : 'Обработать' }
                </ButtonWithLoading>
            </Col>
        </Form>
    );
});