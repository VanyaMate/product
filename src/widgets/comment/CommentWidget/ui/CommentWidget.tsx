import { ComponentPropsWithoutRef, FC, memo, useState } from 'react';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { Comment } from '@/entities/comment/Comment/ui/Comment.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    LikeCommentButtonFeature,
} from '@/features/comment/LikeCommentButtonFeature/ui/LikeCommentButtonFeature.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { ReplyButton } from '@/entities/common/ReplyButton/ui/ReplyButton.tsx';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ReplyCommentForm,
} from '@/widgets/comment/ReplyCommentForm/ui/ReplyCommentForm.tsx';


export type CommentWidgetProps =
    {
        postId: string;
        commentIdTree: Array<string>;
        comment: DomainComment;
        isSubComment: boolean;
    }
    & ComponentPropsWithoutRef<'div'>;

export const CommentWidget: FC<CommentWidgetProps> = memo(function CommentWidget (props) {
    const { comment, postId, commentIdTree, ...other } = props;
    const [ reply, setReply ]                          = useState<boolean>(false);

    return (
        <Comment
            { ...other }
            comment={ comment }
            extraFooter={
                <Row>
                    <ReplyButton
                        amount={ 0 }
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
        >
            {
                (reply || comment.comments.length)
                ? <Col>
                    <ReplyCommentForm
                        commentIdTree={ commentIdTree }
                        opened={ reply }
                        postId={ postId }
                    />
                    {
                        comment.comments.map((_comment) => (
                            <CommentWidget
                                comment={ _comment }
                                commentIdTree={ commentIdTree.concat(comment.id) }
                                isSubComment
                                key={ _comment.id }
                                postId={ postId }
                            />
                        ))
                    }
                </Col>
                : null
            }
        </Comment>
    );
});