import { FC, memo, useMemo, useState } from 'react';
import {
    Comment,
    CommentProps,
} from '@/entities/comment/Comment/ui/Comment.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $postComments,
    $postCommentsHierarchy,
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
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { LinkStyleType } from '@/shared/ui-kit/links/Link/types/types.ts';


export type CommentFromModelWidgetProps =
    {
        postId: string;
        commentId: string;
    }
    & Omit<CommentProps, 'comment'>;

export const CommentFromModelWidget: FC<CommentFromModelWidgetProps> = memo(function CommentFromModelWidget (props) {
    const { commentId, postId, className, isSubComment, ...other } = props;
    const commentHierarchy                                         = useStore($postCommentsHierarchy.get()[commentId]);
    const comment                                                  = useStore($postComments.get()[commentId]);
    const [ reply, setReply ]                                      = useState<boolean>(false);

    const showExtra = useMemo(() => Math.random() > .5, []);

    return (
        <Comment
            { ...other }
            className={
                classNames(
                    css.container,
                    {
                        [css.sub]    : isSubComment,
                        [css.parent] : !!commentHierarchy.length,
                        [css.hasMore]: showExtra,
                    },
                    [ className ],
                )
            }
            comment={ comment }
            extraFooter={
                <Row>
                    <ReplyButton
                        amount={ comment.repliesAmount }
                        onClick={ () => setReply((prev) => !prev) }
                        size={ ButtonSizeType.SMALL }
                        styleType={ reply ? ButtonStyleType.PRIMARY
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
                (reply || comment.comments.length)
                ? <Col>
                    {
                        reply ? <ReplyCommentForm
                            commentId={ commentId }
                            onSubmit={ () => setReply(false) }
                            opened={ reply }
                            postId={ postId }
                        /> : null
                    }
                    {
                        commentHierarchy.map((commentId) => (
                            <CommentFromModelWidget
                                commentId={ commentId }
                                isSubComment
                                key={ commentId }
                                postId={ postId }
                            />
                        ))
                    }
                    {
                        // Temp
                        showExtra ? <Link
                                      className={ css.openMore }
                                      styleType={ LinkStyleType.GHOST }
                                      to="#"
                                  >Раскрыть еще 5</Link>
                                  : null
                    }
                </Col>
                : null
            }
        </Comment>
    );
});