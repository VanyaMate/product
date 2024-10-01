import { ComponentPropsWithoutRef, FC, memo } from 'react';
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


export type ExcelFileSplitFormProps =
    {
        columns: Array<string>;
    }
    & ComponentPropsWithoutRef<'form'>;

export const ExcelFileSplitForm: FC<ExcelFileSplitFormProps> = memo(function ExcelFileSplitForm (props) {
    const { className, columns, ...other } = props;
    const rowsPerFile                      = useInputWithError({
        name: 'rows',
    });
    const formController                   = useForm<{ rows: string }>({
        inputs  : [ rowsPerFile ],
        onSubmit: async (data) => {
            return splitExcelFileEffect(parseInt(data.rows)).then();
        },
    });

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ formController }
        >
            <Col>
                <h4>Столбцы</h4>
                <Row>
                    {
                        columns.map((col, index) => (
                            <label className={ css.label } key={ index }>
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
            <Col>
                <h4>Настройки</h4>
                <InputWithError
                    controller={ rowsPerFile }
                    label="Строк в файле"
                    placeholder="Введите колличество строк в файле"
                    type="number"
                />
            </Col>
            <Col>
                <ButtonWithLoading
                    disabled={ !formController.canBeSubmitted }
                    loading={ formController.pending }
                    type="submit"
                >
                    Обработать
                </ButtonWithLoading>
            </Col>
        </Form>
    );
});