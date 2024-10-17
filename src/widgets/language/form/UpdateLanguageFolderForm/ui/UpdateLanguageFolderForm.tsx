import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './UpdateLanguageFolderForm.module.scss';
import {
    updateLanguageFolderEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    DomainLanguageFolder,
} from 'product-types/dist/language/DomainLanguageFolder';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import {
    DomainLanguageFolderUpdateData,
} from 'product-types/dist/language/DomainLanguageFolderUpdateData';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    isLanguageFolderNameValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageFolderNameValidatorRhf/isLanguageFolderNameValidatorRhf.ts';


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
          }        = props;
    const {
              reset, formState, register, handleSubmit,
          }        = useForm<DomainLanguageFolderUpdateData>({
        defaultValues: {
            title: folder.title,
        },
    });
    const { t }    = useTranslation();
    const onSubmit = useCallback((data: DomainLanguageFolderUpdateData) => {
        return updateLanguageFolderEffect(folder.id, data)
            .then(onSubmitHandler)
            .then(() => reset())
            .catch(onErrorHandler)
            .finally(onFinallyHandler);
    }, [ folder.id, onErrorHandler, onFinallyHandler, onSubmitHandler, reset ]);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <TextInput
                errorMessage={ formState.errors.title?.message }
                placeholder={ t.page.languages.folder_title }
                required
                type="text"
                { ...register('title', {
                    validate: isLanguageFolderNameValidatorRhf,
                    required: true,
                }) }
            />
            <ButtonWithLoading
                disabled={ !formState.isValid }
                loading={ formState.isSubmitting }
                type="submit"
            >
                { t.page.languages.update_folder }
            </ButtonWithLoading>
        </form>
    );
});