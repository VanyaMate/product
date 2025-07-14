import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import { DomainComment } from 'product-types/dist/comment/DomainComment';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    CommentFromModelWidget
} from '@/widgets/comment/CommentFromModelWidget/ui/CommentFromModelWidget.tsx';


export type CommentListProps =
    {
        postId: string,
        comments: Array<DomainComment>,
    }
    & ComponentPropsWithoutRef<'div'>;

export const CommentList: FC<CommentListProps> = memo(function CommentList (props) {
    const { comments, postId, ...other } = props;

    return (
        <Col { ...other }>
            {
                comments.map((comment) => (
                    <CommentFromModelWidget
                        commentId={ comment.id }
                        isSubComment={ false }
                        key={ comment.id }
                        postId={ postId }
                    />
                ))
            }
        </Col>
    );
});