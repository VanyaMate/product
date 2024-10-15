import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CreateLanguageForm.module.scss';
import { createLanguageEffect } from '@/app/model/languages/languages.model.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import {
    DomainLanguageCreateData,
} from 'product-types/dist/language/DomainLanguageCreateData';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';


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
          }                                            = props;
    const { t }                                        = useTranslation();
    const { handleSubmit, register, formState, reset } = useForm();

    const onSubmit = useCallback((data: DomainLanguageCreateData) => {
        return createLanguageEffect(data)
            .then(onSubmitHandler)
            .then(() => reset())
            .catch(onErrorHandler)
            .finally(onFinallyHandler);
    }, [ onErrorHandler, onFinallyHandler, onSubmitHandler, reset ]);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <TextInput
                placeholder={ t.page.languages.language_title }
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
                { t.page.languages.add_language }
            </ButtonWithLoading>
        </form>
    );
});