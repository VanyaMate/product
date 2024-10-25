import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useLayoutEffect,
} from 'react';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { ButtonSizeType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { IoSend } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import { replyOnPostCommentEffect } from '@/app/model/posts/posts.model.ts';


export type ReplyCommentFormProps =
    {
        opened: boolean;
        postId: string;
        commentIdTree: Array<string>;
    }
    & ComponentPropsWithoutRef<'form'>;

export const ReplyCommentForm: FC<ReplyCommentFormProps> = memo(function ReplyCommentForm (props) {
    const { opened, onSubmit, postId, commentIdTree, ...other } = props;

    const {
              handleSubmit,
              formState,
              register,
              setFocus,
              reset,
          } = useForm<DomainCommentCreateData>();

    const onSubmitHandler = useCallback((data: DomainCommentCreateData) => {
        return replyOnPostCommentEffect(postId, commentIdTree, data)
            .then(() => reset())
            .then(() => onSubmit?.(null));
    }, [ commentIdTree, onSubmit, postId, reset ]);

    useLayoutEffect(() => {
        setFocus('comment');
    }, [ opened, setFocus ]);

    return (
        <form
            { ...other }
            onSubmit={ handleSubmit(onSubmitHandler) }
        >
            <TextInput
                placeholder="Ответить на комменатрий"
                required
                type="text"
                { ...register('comment', {
                    required : true,
                    minLength: 1,
                }) }
            />
            <ButtonWithLoading
                disabled={ !formState.isValid }
                loading={ formState.isSubmitting }
                quad
                size={ ButtonSizeType.MEDIUM }
            >
                <IoSend/>
            </ButtonWithLoading>
        </form>
    );
});