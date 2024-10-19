import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './UpdateLanguageWordForm.module.scss';
import {
    updateLanguageWordEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import {
    DomainLanguageWordUpdateData,
} from 'product-types/dist/language/DomainLanguageWordUpdateData';
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


export type UpdateLanguageWordFormProps =
    {
        word: DomainLanguageWord;
        onSubmitHandler?: () => void;
        onErrorHandler?: () => void;
        onFinallyHandler?: () => void;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UpdateLanguageWordForm: FC<UpdateLanguageWordFormProps> = memo(function UpdateLanguageWordForm (props) {
    const {
              word,
              className,
              onSubmitHandler,
              onErrorHandler,
              onFinallyHandler,
              ...other
          }        = props;
    const {
              formState,
              register,
              reset,
              handleSubmit,
          }        = useForm<DomainLanguageWordUpdateData>({
        defaultValues: {
            original: word.original,
            notice  : word.notice,
            /**
             * К сожалению типизация такого не поддерживает, но тут нужно
             * установить значение как строку, а не как массив.
             *
             * Возможно я не разобрался (не очень то и пытался), но
             * дженерики тоже не помогают.
             *
             * В общем и так сойдет. хех.
             */
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            translations: word.translations.join(','),
        },
    });
    const onSubmit = useCallback((data: DomainLanguageWordUpdateData) => {
        return updateLanguageWordEffect(word.id, data)
            .then(onSubmitHandler)
            .then(() => reset())
            .catch(onErrorHandler)
            .finally(onFinallyHandler);
    }, [ onErrorHandler, onFinallyHandler, onSubmitHandler, reset, word.id ]);
    const { t }    = useTranslation();

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
                { t.page.languages.update_word }
            </ButtonWithLoading>
        </form>
    );
});