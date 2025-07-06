import { FC, memo, useMemo, useState } from 'react';
import {
    Comment,
    CommentProps,
} from '@/entities/comment/Comment/ui/Comment.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $postComments, $postCommentsCursors,
    $postCommentsHierarchy,
    getCommentRepliesByCursorEffect,
    getCommentRepliesEffect,
} from '@/app/model/posts/post-comments.model.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { ReplyButton } from '@/entities/common/ReplyButton/ui/ReplyButton.tsx';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    LikeCommentButtonFeature,
} from '@/features/comment/LikeCommentButtonFeature/ui/LikeCommentButtonFeature.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    ReplyCommentForm,
} from '@/widgets/comment/ReplyCommentForm/ui/ReplyCommentForm.tsx';
import css from './CommentFromModelWidget.module.scss';
import classNames from 'classnames';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    CommentButton,
} from '@/entities/common/CommentButton/ui/CommentButton.tsx';
import { logError } from '@/app/console/logError.ts';


export type CommentFromModelWidgetProps =
    {
        postId: string;
        commentId: string;
    }
    & Omit<CommentProps, 'comment'>;

export const CommentFromModelWidget: FC<CommentFromModelWidgetProps> = memo(function CommentFromModelWidget (props) {
    const { commentId, postId, className, isSubComment, ...other } = props;

    const commentHierarchy                  = useStore($postCommentsHierarchy.get()[commentId]);
    const comment                           = useStore($postComments.get()[commentId]);
    const commentCursors                    = useStore($postCommentsCursors.get()[commentId]);
    const [ reply, setReply ]               = useState<boolean>(false);
    const [ openComments, setOpenComments ] = useState<boolean>(!!commentHierarchy.length);

    const hasMoreAmount = useMemo<number>(() => comment.repliesAmount - commentHierarchy.length, [ comment, commentHierarchy ]);
    const hasMore       = useMemo(() => hasMoreAmount > 0, [ hasMoreAmount ]);

    console.log('Comment widget', hasMoreAmount, hasMore, isSubComment, commentHierarchy.length);

    return (
        <Comment
            { ...other }
            className={
                classNames(
                    css.container,
                    {
                        [css.sub]    : isSubComment,
                        [css.parent] : !!commentHierarchy.length || hasMore,
                        [css.hasMore]: hasMore,
                    },
                    [ className ],
                )
            }
            comment={ comment }
            extraFooter={
                <Row>
                    <ReplyButton
                        onClick={ () => setReply((prev) => !prev) }
                        size={ ButtonSizeType.SMALL }
                        styleType={ reply ? ButtonStyleType.PRIMARY
                                          : ButtonStyleType.GHOST }
                    />
                    <CommentButton
                        amount={ comment.repliesAmount }
                        disabled={ !commentHierarchy.length }
                        onClick={ () => setOpenComments((prev) => !prev) }
                        size={ ButtonSizeType.SMALL }
                        styleType={ (commentHierarchy.length && openComments)
                                    ? ButtonStyleType.PRIMARY
                                    : ButtonStyleType.GHOST }
                    />
                    <LikeCommentButtonFeature
                        amount={ comment.likesAmount }
                        commentId={ comment.id }
                        liked={ comment.liked }
                    />
                </Row>
            }
            isSubComment={ isSubComment }
        >
            {
                (reply || (openComments && commentHierarchy.length) || hasMore)
                ? <Col>
                    {
                        reply ? <ReplyCommentForm
                            commentId={ commentId }
                            key="reply-form"
                            onSubmit={ () => {
                                setReply(false);
                                setOpenComments(true);
                            } }
                            opened={ reply }
                            postId={ postId }
                        /> : null
                    }
                    {
                        openComments ? commentHierarchy.map((commentId) => (
                            <CommentFromModelWidget
                                commentId={ commentId }
                                isSubComment
                                key={ commentId }
                                postId={ postId }
                            />
                        )) : null
                    }
                    {
                        hasMore
                        ? <ButtonWithLoading
                            className={ css.openMore }
                            key="has-more"
                            onClick={ async () => {
                                if (commentCursors) {
                                    setOpenComments(true);
                                    return getCommentRepliesByCursorEffect(commentId, commentCursors, 3)
                                        .catch(logError(getCommentRepliesByCursorEffect.name))
                                        .catch(() => setOpenComments(false));
                                } else {
                                    setOpenComments(true);
                                    return getCommentRepliesEffect(commentId, 3)
                                        .catch(logError(getCommentRepliesByCursorEffect.name))
                                        .catch(() => setOpenComments(false));
                                }
                            } }
                            size={ ButtonSizeType.SMALL }
                            styleType={ ButtonStyleType.GHOST }
                        >
                            Раскрыть еще { Math.min(3, hasMoreAmount) }
                        </ButtonWithLoading>
                        : null
                    }
                </Col>
                : null
            }
        </Comment>
    );
});