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
import { Post } from '@/entities/post/item/Post/ui/Post.tsx';
import {
    CreatePostForm,
} from '@/widgets/posts/CreatePostForm/ui/CreatePostForm.tsx';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';
import { useTranslation } from 'react-i18next';
import {
    PostDropdownButton,
} from '@/features/post/button/PostDropdownButton/ui/PostDropdownButton.tsx';
import {
    VirtualRenderMethod,
} from '@/shared/ui-kit/box/Virtual/types/types.ts';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import { Virtual } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import { NoMorePosts } from '@/entities/post/NoMorePosts/ui/NoMorePosts.tsx';


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
    const { t }                           = useTranslation([ 'posts' ]);

    useLayoutEffect(() => {
        if (currentPostsUserId !== userId) {
            getPostsByUserIdEffect(userId, { limit: 20 });
        }
    }, [ currentPostsUserId, userId ]);

    const render = useCallback<VirtualRenderMethod>((post: DomainPost) => {
        return (
            <Post
                extra={
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
                : t('empty_posts_list')
            }
        </section>
    );
});