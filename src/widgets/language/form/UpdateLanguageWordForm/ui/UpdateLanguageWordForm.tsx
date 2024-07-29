import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UpdateLanguageWordForm.module.scss';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    updateLanguageWordEffect,
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
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';
import { useTranslation } from 'react-i18next';


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
          }                           = props;
    const originalInputController     = useInputWithError({
        name            : 'original',
        validationMethod: lengthValidator(1, Infinity),
    });
    const translationsInputController = useInputWithError({
        name            : 'translations',
        validationMethod: lengthValidator(1, Infinity),
    });
    const noticeInputController       = useInputWithError({
        name: 'notice',
    });
    const formController              = useForm<{
        original: string,
        translations: string,
        notice: string
    }>({
        inputs  : [ originalInputController, translationsInputController, noticeInputController ],
        onSubmit: async (data) => updateLanguageWordEffect(word.id, {
            original    : data.original,
            notice      : data.notice,
            translations: data.translations.split(','),
        })
            .then(onSubmitHandler)
            .catch(onErrorHandler)
            .finally(onFinallyHandler),
    });
    const { t }                       = useTranslation([ 'languages' ]);

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ formController }
        >
            <InputWithError controller={ originalInputController }
                            defaultValue={ word.original }
                            placeholder={ t('word_original') }
            />
            <InputWithError controller={ translationsInputController }
                            defaultValue={ word.translations.join(',') }
                            placeholder={ t('word_translations') }
            />
            <InputWithError controller={ noticeInputController }
                            defaultValue={ word.notice }
                            placeholder={ t('word_notice') }
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