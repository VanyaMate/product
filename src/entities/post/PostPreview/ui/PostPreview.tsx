import { ComponentPropsWithoutRef, FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import css from './PostPreview.module.scss';
import { DomainPost } from 'product-types/dist/post/DomainPost';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { getUserPageUrl } from '@/features/routes/lib/getUserPageUrl.ts';


export type PostPreviewProps =
    {
        post: DomainPost;
        extraOptions?: ReactNode;
        extraFooter?: ReactNode;
    }
    & ComponentPropsWithoutRef<'article'>;

export const PostPreview: FC<PostPreviewProps> = memo(function PostPreview (props) {
    const { className, post, extraOptions, extraFooter, ...other } = props;

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <header>
                <div className={ css.left }>
                    <UserAvatar
                        avatar={ post.author.avatar }
                        login={ post.author.login }
                    />
                    <div className={ css.info }>
                        <Link
                            to={ getUserPageUrl(post.author.login) }
                        >
                            { post.author.login }
                        </Link>
                        <time>{ new Date(post.creationData).toUTCString() }</time>
                    </div>
                </div>
                { extraOptions }
            </header>
            <div>
                { post.message }
            </div>
            {
                extraFooter
                ? <footer>
                    { extraFooter }
                </footer>
                : null
            }
        </article>
    );
});