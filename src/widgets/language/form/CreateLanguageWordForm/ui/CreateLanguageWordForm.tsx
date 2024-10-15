import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CreateLanguageWordForm.module.scss';
import {
    createLanguageWordEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import {
    DomainLanguageWordCreateData,
} from 'product-types/dist/language/DomainLanguageWordCreateData';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';


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
                placeholder={ t.page.languages.word_original }
                required
                type="text"
                { ...register('original', {
                    minLength: 1,
                    maxLength: 255,
                    required : true,
                }) }
            />
            {
                // TODO: Вынести валидацию в методы (как с login, email и
                //  password)
            }
            <TextInput
                placeholder={ t.page.languages.word_translations }
                required
                type="text"
                { ...register('translations', {
                    minLength : 1,
                    maxLength : 1000,
                    required  : true,
                    setValueAs: (value: string) => value.split(','),
                }) }
            />
            <TextInput
                placeholder={ t.page.languages.word_notice }
                type="text"
                { ...register('notice', {
                    maxLength: 1000,
                }) }
            />
            <ButtonWithLoading
                disabled={ !formState.isValid }
                loading={ formState.isSubmitting }
                styleType={ ButtonStyleType.PRIMARY }
                type="submit"
            >
                { t.page.languages.add_word }
            </ButtonWithLoading>
        </form>
    );
});