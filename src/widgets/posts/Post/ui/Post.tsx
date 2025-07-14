import { type ComponentPropsWithoutRef, type FC, memo, useState } from 'react';
import classNames from 'classnames';
import css from './Post.module.css';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    CommentButton,
} from '@/entities/common/CommentButton/ui/CommentButton.tsx';
import {
    ForwardButton,
} from '@/entities/common/ForwardButton/ui/ForwardButton.tsx';
import { LikeButton } from '@/entities/common/LikeButton/ui/LikeButton.tsx';
import {
    likePostEffect,
    unlikePostEffect,
} from '@/app/model/posts/posts.model.ts';
import {
    PostDropdownButton,
} from '@/features/post/button/PostDropdownButton/ui/PostDropdownButton.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    CreateCommentForm,
} from '@/widgets/comment/CreateCommenForm/ui/CreateCommentForm.tsx';
import { CommentList } from '@/widgets/comment/CommentList/ui/CommentList.tsx';
import { PostPreview } from '@/entities/post/PostPreview/ui/PostPreview.tsx';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import {
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';


/**
 * TODO: Сделать чтобы не было лишнего отступа если нет комменатриев и не
 * открыт ответ
 */

export type PostProps =
    {
        post: DomainPost;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Post: FC<PostProps> = memo(function Post (props) {
    const { className, post, ...other }             = props;
    const [ commentsIsOpened, setCommentsIsOpened ] = useState<boolean>(false);

    return (
        <PostPreview
            className={ classNames(css.container, {}, [ className ]) }
            extraFooter={
                <Row spaceBetween>
                    <Row>
                        <CommentButton
                            amount={ post.commentsAmount }
                            onClick={ () => setCommentsIsOpened((prev) => !prev) }
                            styleType={
                                commentsIsOpened ? ButtonStyleType.PRIMARY
                                                 : ButtonStyleType.GHOST
                            }
                        />
                        <ForwardButton
                            amount={ post.forwardsAmount }
                        />
                    </Row>
                    <LikeButton
                        amount={ post.likesAmount }
                        liked={ post.liked }
                        onLike={ () => likePostEffect(post.id) }
                        onUnlike={ () => unlikePostEffect(post.id) }
                    />
                </Row>
            }
            extraHeader={
                <PostDropdownButton postId={ post.id }/>
            }
            key={ post.id }
            module={
                <section>
                    <Col>
                        <CreateCommentForm
                            opened={ commentsIsOpened }
                            postId={ post.id }
                        />
                        <CommentList
                            comments={ post.comments }
                            key="comments"
                            postId={ post.id }
                        />
                    </Col>
                </section>
            }
            post={ post }
            { ...other }
        />
    );
});