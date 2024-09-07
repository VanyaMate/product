import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './CreateLanguageFolderForm.module.scss';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    updateLanguageFolderEffect,
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
import { IoSettings } from 'react-icons/io5';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';
import {
    DomainLanguageFolder,
} from 'product-types/dist/language/DomainLanguageFolder';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UpdateLanguageFolderFormProps =
    {
        folder: DomainLanguageFolder;
        onSubmitHandler?: () => void;
        onErrorHandler?: () => void;
        onFinallyHandler?: () => void;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UpdateLanguageFolderForm: FC<UpdateLanguageFolderFormProps> = memo(function UpdateLanguageFolderForm (props) {
    const {
              folder,
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
        onSubmit: async (data) => updateLanguageFolderEffect(folder.id, data)
            .then(onSubmitHandler)
            .catch(onErrorHandler)
            .finally(onFinallyHandler),
    });
    const { t }                = useTranslation();

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ formController }
        >
            <InputWithError
                controller={ titleInputController }
                defaultValue={ folder.title }
                placeholder={ t.page.languages.folder_title }
            />
            <ButtonWithLoading
                disabled={ !formController.canBeSubmitted }
                loading={ formController.pending }
                styleType={ ButtonStyleType.PRIMARY }
                type="submit"
            >
                <Row>
                    <IoSettings/>
                    <span>{ t.page.languages.update_folder }</span>
                </Row>
            </ButtonWithLoading>
        </Form>
    );
});