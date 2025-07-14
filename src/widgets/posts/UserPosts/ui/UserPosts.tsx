import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
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
    VirtualRenderMethod,
} from '@/shared/ui-kit/box/Virtual/types/types.ts';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import { Virtual } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import { NoMorePosts } from '@/entities/post/NoMorePosts/ui/NoMorePosts.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { logError } from '@/app/console/logError.ts';
import { Post } from '@/widgets/posts/Post/ui/Post.tsx';


// TODO: Переделать LikeButton, CommentsFormPreview
// TODO: Я устал.
/**
 * 1. Не работает Reply на Reply. Проверить.
 * 2. При Reply на комменатрий под постов - сбрасывается state. Проверить.
 */


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
            getPostsByUserIdEffect(userId, { limit: 20 }).catch(logError(getPostsByUserIdEffect.name));
        }
    }, [ currentPostsUserId, userId ]);

    const render = useCallback<VirtualRenderMethod>((post: DomainPost) => (
        <Post
            key={ post.id }
            post={ post }
        />
    ), []);

    return (
        <section
            { ...other }
            className={ classNames(css.container, { [css.loading]: postsPending }, [ className ]) }
        >
            {
                userId === authData.id
                ? <CreatePostForm key="form"/>
                : null
            }
            {
                (!posts.length && postsPending)
                ? <PageLoader/>
                : posts.length
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