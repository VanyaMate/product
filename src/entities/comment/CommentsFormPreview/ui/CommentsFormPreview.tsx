import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CommentsFormPreview.module.scss';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { useForm } from 'react-hook-form';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoSend } from 'react-icons/io5';


export type CommentsFormPreviewProps =
    {
        onSubmitHandler: (createData: DomainCommentCreateData) => Promise<any>;
    }
    & ComponentPropsWithoutRef<'div'>;

export const CommentsFormPreview: FC<CommentsFormPreviewProps> = memo(function CommentsFormPreview (props) {
    const {
              className,
              onSubmitHandler,
              children,
              ...other
          } = props;
    const {
              handleSubmit,
              formState,
              reset,
              register,
          } = useForm<DomainCommentCreateData>({ mode: 'onChange' });

    const onSubmit = useCallback((data: DomainCommentCreateData) => {
        if (onSubmitHandler) {
            return onSubmitHandler(data).then(() => reset());
        }
    }, [ onSubmitHandler, reset ]);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { children }
            <form onSubmit={ handleSubmit(onSubmit) }>
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
        </section>
    );
});