import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './CreateLanguageFolderForm.module.scss';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    createLanguageFolderEffect,
} from '@/app/model/languages/languages.model.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { IoCreate } from 'react-icons/io5';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';
import { useTranslation } from 'react-i18next';


export type CreateLanguageFolderFormProps =
    {
        languageId: string;
        onSubmitHandler?: () => void;
        onErrorHandler?: () => void;
        onFinallyHandler?: () => void;
    }
    & ComponentPropsWithoutRef<'form'>;

export const CreateLanguageFolderForm: FC<CreateLanguageFolderFormProps> = memo(function CreateLanguageFolderForm (props) {
    const {
              languageId,
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
        onSubmit: async (data) => createLanguageFolderEffect(languageId, data)
            .then(onSubmitHandler)
            .catch(onErrorHandler)
            .finally(onFinallyHandler),
    });
    const { t }                = useTranslation([ 'languages' ]);

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ formController }
        >
            <InputWithError
                controller={ titleInputController }
                placeholder={ t('folder_title') }
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