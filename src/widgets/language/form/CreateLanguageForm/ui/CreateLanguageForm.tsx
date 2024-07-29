import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CreateLanguageForm.module.scss';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import { createLanguageEffect } from '@/app/model/languages/languages.model.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCreate } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';
import { useTranslation } from 'react-i18next';


export type CreateLanguageFormProps =
    {
        onSubmitHandler?: () => void;
        onErrorHandler?: () => void;
        onFinallyHandler?: () => void;
    }
    & ComponentPropsWithoutRef<'form'>;

export const CreateLanguageForm: FC<CreateLanguageFormProps> = memo(function CreateLanguageForm (props) {
    const {
              className,
              onSubmitHandler,
              onErrorHandler,
              onFinallyHandler,
              ...other
          }                    = props;
    const titleInputController = useInputWithError({
        name            : 'title',
        validationMethod: lengthValidator(1, Infinity),
    });
    const formController       = useForm<{ title: string }>({
        inputs  : [ titleInputController ],
        onSubmit: async (data) => createLanguageEffect(data)
            .then(onSubmitHandler)
            .then(clearForm)
            .catch(onErrorHandler)
            .finally(onFinallyHandler),
    });
    const { t }                = useTranslation([ 'languages' ]);

    const clearForm = useCallback(() => {
        titleInputController.value.current          = '';
        titleInputController.inputRef.current.value = '';
    }, [ titleInputController.inputRef, titleInputController.value ]);

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ formController }
        >
            <InputWithError
                controller={ titleInputController }
                placeholder={ t('language_title') }
            />
            <ButtonWithLoading
                disabled={ !formController.canBeSubmitted }
                loading={ formController.pending }
                styleType={ ButtonStyleType.PRIMARY }
                type="submit"
            >
                <Row>
                    <IoCreate/>
                    <span>{ t('add_item') }</span>
                </Row>
            </ButtonWithLoading>
        </Form>
    );
});