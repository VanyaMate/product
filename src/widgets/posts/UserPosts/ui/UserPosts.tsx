import {
    ComponentPropsWithoutRef,
    FC,
    memo, useCallback,
    useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import css from './UserPosts.module.scss';
import {
    $currentPostUserId,
    $postsList,
    $postsPending,
    getPostsByUserIdEffect,
} from '@/app/model/posts/posts.model.ts';
import { useStore } from '@vanyamate/sec-react';
import {
    CreatePostForm,
} from '@/widgets/posts/CreatePostForm/ui/CreatePostForm.tsx';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';
import {
    PostDropdownButton,
} from '@/features/post/button/PostDropdownButton/ui/PostDropdownButton.tsx';
import {
    VirtualRenderMethod,
} from '@/shared/ui-kit/box/Virtual/types/types.ts';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import { Virtual } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import { NoMorePosts } from '@/entities/post/NoMorePosts/ui/NoMorePosts.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { PostPreview } from '@/entities/post/PostPreview/ui/PostPreview.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { LikeButton } from '@/entities/common/LikeButton/ui/LikeButton.tsx';
import {
    ForwardButton,
} from '@/entities/common/ForwardButton/ui/ForwardButton.tsx';
import {
    CommentButton,
} from '@/entities/common/CommentButton/ui/CommentButton.tsx';


export type UserPostsProps =
    {
        userId: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UserPosts: FC<UserPostsProps> = memo(function UserPosts (props) {
    const { userId, className, ...other } = props;
    const currentPostsUserId              = useStore($currentPostUserId);
    const posts                           = useStore($postsList);
    const postsPending                    = useStore($postsPending);
    const authData                        = useStore($authUser);
    const { t }                           = useTranslation();

    useLayoutEffect(() => {
        if (currentPostsUserId !== userId) {
            getPostsByUserIdEffect(userId, { limit: 20 });
        }
    }, [ currentPostsUserId, userId ]);

    const render = useCallback<VirtualRenderMethod>((post: DomainPost) => {
        return (
            <PostPreview
                extraFooter={
                    <Row spaceBetween>
                        <Row>
                            <LikeButton amount={ 100 } liked={ true }/>
                            <ForwardButton amount={ 15 }/>
                            <CommentButton amount={ 6 }/>
                        </Row>
                        <LikeButton amount={ 1000 } liked={ false }/>
                    </Row>
                }
                extraOptions={
                    <PostDropdownButton postId={ post.id }/>
                }
                key={ post.id }
                post={ post }
            />
        );
    }, []);

    return (
        <section
            { ...other }
            className={ classNames(css.container, { [css.loader]: postsPending }, [ className ]) }
        >
            {
                userId === authData.id
                ? <CreatePostForm key="form"/>
                : null
            }
            {
                posts.length
                ? <Virtual
                    contentClassName={ css.posts }
                    list={ posts }
                    loaderPreviousElement={ <Loader/> }
                    loadingPrevious={ postsPending }
                    noMorePreviousElement={ <NoMorePosts/> }
                    render={ render }
                />
                : t.page.posts.empty_posts_list
            }
        </section>
    );
});