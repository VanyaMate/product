import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CreateLanguageFolderForm.module.scss';
import {
    createLanguageFolderEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    DomainLanguageFolderCreateData,
} from 'product-types/dist/language/DomainLanguageFolderCreateData';


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
          }     = props;
    const {
              handleSubmit,
              formState,
              register,
              reset,
          }     = useForm<DomainLanguageFolderCreateData>();
    const { t } = useTranslation();

    const onSubmit = useCallback((data: DomainLanguageFolderCreateData) => {
        return createLanguageFolderEffect(languageId, data)
            .then(onSubmitHandler)
            .then(() => reset())
            .catch(onErrorHandler)
            .finally(onFinallyHandler);
    }, [ languageId, onErrorHandler, onFinallyHandler, onSubmitHandler, reset ]);


    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <TextInput
                placeholder={ t.page.languages.folder_title }
                required
                type="text"
                { ...register('title', {
                    required : true,
                    minLength: 1,
                    maxLength: 255,
                }) }
            />
            <ButtonWithLoading
                disabled={ !formState.isValid }
                loading={ formState.isSubmitting }
                type="submit"
            >
                { t.page.languages.add_folder }
            </ButtonWithLoading>
        </form>
    );
});