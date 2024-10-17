import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CreateLanguageWordForm.module.scss';
import {
    createLanguageWordEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import {
    DomainLanguageWordCreateData,
} from 'product-types/dist/language/DomainLanguageWordCreateData';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    isLanguageWordNameValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageWordNameValidatorRhf/isLanguageWordNameValidatorRhf.ts';
import {
    isLanguageWordTranslationsValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageWordTranslationsValidatorRhf/isLanguageWordTranslationsValidatorRhf.ts';
import {
    isLanguageWordNoticeValidatorRhf,
} from '@/app/react-hook-form/validator/isLanguageWordNoticeValidatorRhf/isLanguageWordNoticeValidatorRhf.ts';


export type CreateLanguageWordFormProps =
    {
        folderId: string;
        onSubmitHandler?: () => void;
        onErrorHandler?: () => void;
        onFinallyHandler?: () => void;
    }
    & ComponentPropsWithoutRef<'form'>;

export const CreateLanguageWordForm: FC<CreateLanguageWordFormProps> = memo(function CreateLanguageWordForm (props) {
    const {
              folderId,
              className,
              onSubmitHandler,
              onErrorHandler,
              onFinallyHandler,
              ...other
          }     = props;
    const {
              reset,
              handleSubmit,
              formState,
              register,
          }     = useForm<DomainLanguageWordCreateData>();
    const { t } = useTranslation();

    const onSubmit = useCallback((data: DomainLanguageWordCreateData) => {
        return createLanguageWordEffect(folderId, data)
            .then(onSubmitHandler)
            .then(() => reset())
            .catch(onErrorHandler)
            .finally(onFinallyHandler);
    }, [ folderId, onErrorHandler, onFinallyHandler, onSubmitHandler, reset ]);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <TextInput
                errorMessage={ formState.errors.original?.message }
                placeholder={ t.page.languages.word_original }
                required
                type="text"
                { ...register('original', {
                    validate: isLanguageWordNameValidatorRhf,
                    required: true,
                }) }
            />
            <TextInput
                errorMessage={ formState.errors.translations?.message }
                placeholder={ t.page.languages.word_translations }
                required
                type="text"
                { ...register('translations', {
                    validate  : isLanguageWordTranslationsValidatorRhf,
                    required  : true,
                    setValueAs: (value: string) => value.split(','),
                }) }
            />
            <TextInput
                errorMessage={ formState.errors.notice?.message }
                placeholder={ t.page.languages.word_notice }
                type="text"
                { ...register('notice', {
                    validate: isLanguageWordNoticeValidatorRhf,
                }) }
            />
            <ButtonWithLoading
                disabled={ !formState.isValid }
                loading={ formState.isSubmitting }
                type="submit"
            >
                { t.page.languages.add_word }
            </ButtonWithLoading>
        </form>
    );
});