import {
    ComponentPropsWithoutRef,
    FC,
    memo,
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

    return (
        <section
            { ...other }
            className={ classNames(css.container, { [css.loader]: postsPending }, [ className ]) }
        >
            <header className={ css.header } key="header">
                <h3>{ t('posts_title') }</h3>
            </header>
            {
                userId === authData.id
                ? <CreatePostForm key="form"/>
                : null
            }
            {
                postsPending && !posts.length
                ? <Loader className={ css.loader }/>
                : posts.length ? (
                    <div className={ css.posts }>
                        {
                            posts.map((post) => (
                                <Post
                                    extra={
                                        <PostDropdownButton postId={ post.id }/>
                                    }
                                    key={ post.id }
                                    post={ post }
                                />
                            ))
                        }
                    </div>
                ) : t('empty_posts_list')
            }
        </section>
    );
});