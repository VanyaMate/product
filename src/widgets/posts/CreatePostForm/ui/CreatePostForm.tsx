import { FC, memo } from 'react';
import css from './CreatePostForm.module.scss';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { createPostEffect } from '@/app/model/posts/posts.model.ts';
import { IoSend } from 'react-icons/io5';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    DomainPostCreateData,
} from 'product-types/dist/post/DomainPostCreateData';
import {
    isPostTextValidatorRhf,
} from '@/app/react-hook-form/validator/isPostTextValidatorRhf/isPostTextValidatorRhf.ts';


export const CreatePostForm: FC = memo(function CreatePostForm () {
    const { t } = useTranslation();

    const {
              register, handleSubmit, formState, reset,
          } = useForm<DomainPostCreateData>({ mode: 'onChange' });

    const createPostHandler = function (data: DomainPostCreateData) {
        return createPostEffect(data).then(() => reset());
    };

    return (
        <form
            className={ css.container }
            onSubmit={ handleSubmit(createPostHandler) }
        >
            <TextInput
                className={ css.input }
                errorMessage={ formState.errors.message?.message }
                placeholder={ t.page.posts.write_new_post }
                required
                type="text"
                { ...register('message', {
                    required: true,
                    validate: isPostTextValidatorRhf,
                }) }
            />
            <ButtonWithLoading
                disabled={ !formState.isValid }
                loading={ formState.isSubmitting }
                quad
                type="submit"
            >
                <IoSend/>
            </ButtonWithLoading>
        </form>
    );
});