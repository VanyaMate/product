import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './CommentsFormPreview.module.scss';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { useForm } from 'react-hook-form';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoSend } from 'react-icons/io5';
import { Comment } from '@/entities/comment/Comment/ui/Comment.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    ForwardButton,
} from '@/entities/common/ForwardButton/ui/ForwardButton.tsx';
import { ButtonSizeType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { ReplyButton } from '@/entities/common/ReplyButton/ui/ReplyButton.tsx';
import { LikeButton } from '@/entities/common/LikeButton/ui/LikeButton.tsx';


export type CommentsFormPreviewProps =
    {
        comments: Array<DomainComment>;
        onLike: (commentId: string) => Promise<any>;
        onUnlike: (commentId: string) => Promise<any>;
        onSubmitHandler: (comment: string) => Promise<any>;
    }
    & ComponentPropsWithoutRef<'div'>;

export const CommentsFormPreview: FC<CommentsFormPreviewProps> = memo(function CommentsFormPreview (props) {
    const {
              className,
              comments,
              onSubmitHandler,
              onLike,
              onUnlike,
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
            return onSubmitHandler(data.comment).then(() => reset());
        }
    }, [ onSubmitHandler, reset ]);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            {
                comments.map((comment) => (
                    <Comment
                        comment={ comment }
                        extraFooter={
                            <Row>
                                <ForwardButton
                                    amount={ comment.forwardsAmount }
                                    size={ ButtonSizeType.SMALL }
                                />
                                <ReplyButton
                                    amount={ comment.repliesAmount }
                                    size={ ButtonSizeType.SMALL }
                                />
                                <LikeButton
                                    amount={ comment.likesAmount }
                                    liked={ comment.liked }
                                    onLike={ () => onLike(comment.id) }
                                    onUnlike={ () => onUnlike(comment.id) }
                                    size={ ButtonSizeType.SMALL }
                                />
                            </Row>
                        }
                        key={ comment.id }
                    />
                ))
            }
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