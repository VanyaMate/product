import {
    type ComponentPropsWithoutRef,
    type FC,
    memo,
    useCallback,
} from 'react';
import classNames from 'classnames';
import css from './CreateCommentForm.module.css';
import { useForm } from 'react-hook-form';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoSend } from 'react-icons/io5';
import { sendPostCommentEffect } from '@/app/model/posts/posts.model.ts';


export type CreateCommentFormProps =
    {
        postId: string;
        opened: boolean;
    }
    & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>;

export const CreateCommentForm: FC<CreateCommentFormProps> = memo(function CreateCommentForm (props) {
    const { className, postId, opened, ...other } = props;
    const {
              handleSubmit,
              formState,
              reset,
              register,
          }                                       = useForm<DomainCommentCreateData>({ mode: 'onChange' });

    const onSubmitHandler = useCallback(async (data: DomainCommentCreateData) => {
        return sendPostCommentEffect(postId, data).then(() => reset());
    }, [ postId, reset ]);

    return (
        <form onSubmit={ handleSubmit(onSubmitHandler) } { ...other }
              className={ classNames(css.container, { [css.opened]: opened }, [ className ]) }>
            <TextInput
                placeholder="Введите коментарий"
                required
                type="text"
                { ...register('comment', {
                    required: true,
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