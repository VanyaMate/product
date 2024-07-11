import { FC, memo } from 'react';
import classNames from 'classnames';
import css from './CreatePostForm.module.scss';
import { Form, FormProps } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import { createPostEffect } from '@/app/model/posts/posts.model.ts';
import { IoSend } from 'react-icons/io5';
import { lengthValidator } from '@/app/validation/string/length.validator.ts';
import { useTranslation } from 'react-i18next';


export type CreatePostFormProps =
    {}
    & Omit<FormProps, 'controller'>;

export const CreatePostForm: FC<CreatePostFormProps> = memo(function CreatePostForm (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'posts' ]);

    const inputController = useInputWithError({
        name            : 'message',
        validationMethod: lengthValidator(1, 255),
    });

    const formController = useForm<{ message: string }>({
        inputs  : [ inputController ],
        onSubmit: async (data) => createPostEffect(data).then(),
    });

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ formController }
        >
            <InputWithError
                containerClassName={ css.input }
                controller={ inputController }
                placeholder={ t('write_new_post') }
            />
            <ButtonWithLoading
                disabled={ !formController.canBeSubmitted }
                loading={ formController.pending }
                quad
                type="submit"
            >
                <IoSend/>
            </ButtonWithLoading>
        </Form>
    );
});