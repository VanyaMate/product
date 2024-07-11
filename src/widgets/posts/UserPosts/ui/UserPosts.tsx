import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './UserPosts.module.scss';
import {
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
import {
    IoEllipsisHorizontal,
} from 'react-icons/io5';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useTranslation } from 'react-i18next';


export type UserPostsProps =
    {
        userId: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const UserPosts: FC<UserPostsProps> = memo(function UserPosts (props) {
    const { userId, className, ...other } = props;
    const posts                           = useStore($postsList);
    const postsPending                    = useStore($postsPending);
    const authData                        = useStore($authUser);
    const { t }                           = useTranslation([ 'posts' ]);

    useEffect(() => {
        getPostsByUserIdEffect(userId, { limit: 20 });
    }, [ userId ]);

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
                postsPending
                ? <Loader className={ css.loader }/>
                : posts.length ? (
                    <div className={ css.posts } key="posts">
                        {
                            posts.map((post) => (
                                <Post
                                    extra={
                                        <Button
                                            quad
                                            styleType={ ButtonStyleType.GHOST }
                                        >
                                            <IoEllipsisHorizontal/>
                                        </Button>
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