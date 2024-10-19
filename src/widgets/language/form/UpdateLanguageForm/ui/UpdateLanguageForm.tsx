import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './UpdateLanguageForm.module.scss';
import {
    updateLanguageEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { DomainLanguage } from 'product-types/dist/language/DomainLanguage';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import {
    DomainLanguageUpdateData,
} from 'product-types/dist/language/DomainLanguageUpdateData';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    isLanguageNameValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageNameValidatorRhf/isLanguageNameValidatorRhf.ts';


export type UpdateLanguageFormProps =
    {
        language: DomainLanguage;
        onSubmitHandler?: () => void;
        onErrorHandler?: () => void;
        onFinallyHandler?: () => void;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UpdateLanguageForm: FC<UpdateLanguageFormProps> = memo(function UpdateLanguageForm (props) {
    const {
              language,
              className,
              onSubmitHandler,
              onErrorHandler,
              onFinallyHandler,
              ...other
          }        = props;
    const {
              formState,
              reset,
              register,
              handleSubmit,
          }        = useForm<DomainLanguageUpdateData>({
        defaultValues: {
            title: language.title,
        },
    });
    const onSubmit = useCallback((data: DomainLanguageUpdateData) => {
        return updateLanguageEffect(language.id, data)
            .then(onSubmitHandler)
            .then(() => reset())
            .catch(onErrorHandler)
            .finally(onFinallyHandler);
    }, [ language.id, onErrorHandler, onFinallyHandler, onSubmitHandler, reset ]);
    const { t }    = useTranslation();

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
                    validate: isLanguageNameValidatorRhf,
                    required: true,
                }) }
            />
            <ButtonWithLoading
                disabled={ !formState.isValid }
                loading={ formState.isSubmitting }
                type="submit"
            >
                { t.page.languages.update_language }
            </ButtonWithLoading>
        </form>
    );
});