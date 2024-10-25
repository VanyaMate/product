import { FC, memo, useCallback } from 'react';
import {
    LikeButton,
    LikeButtonProps,
} from '@/entities/common/LikeButton/ui/LikeButton.tsx';
import {
    likePostCommentAction,
} from '@/app/action/post-comment/likePostComment/likePostComment.action.ts';
import { ButtonSizeType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    unlikePostCommentAction,
} from '@/app/action/post-comment/unlikePostComment/unlikePostComment.action.ts';


export type LikeCommentButtonFeatureProps =
    {
        commentId: string;
    }
    & Omit<LikeButtonProps, 'onLike' | 'onUnlike'>;

export const LikeCommentButtonFeature: FC<LikeCommentButtonFeatureProps> = memo(function LikeCommentButtonFeature (props) {
    const { commentId, onClick, ...other } = props;

    const onLikeHandler = useCallback(() => {
        return likePostCommentAction(commentId).then(onClick);
    }, [ commentId, onClick ]);

    const onUnlikeHandler = useCallback(() => {
        return unlikePostCommentAction(commentId).then(onClick);
    }, [ commentId, onClick ]);

    return (
        <LikeButton
            { ...other }
            onLike={ onLikeHandler }
            onUnlike={ onUnlikeHandler }
            size={ ButtonSizeType.SMALL }
        />
    );
});