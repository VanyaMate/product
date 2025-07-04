import { ComponentPropsWithoutRef, FC, memo, ReactNode, useMemo } from 'react';
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
        extraHeader?: ReactNode;
        extraFooter?: ReactNode;
        module?: ReactNode;
    }
    & ComponentPropsWithoutRef<'article'>;

export const PostPreview: FC<PostPreviewProps> = memo(function PostPreview (props) {
    const {
              className, post, extraHeader, extraFooter, module, ...other
          } = props;

    const date = useMemo(() => new Date(post.creationData).toLocaleString(), [ post.creationData ]);

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div className={ css.main }>
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
                            <time dateTime={ date }>{ date }</time>
                        </div>
                    </div>
                    { extraHeader }
                </header>
                <div className={ css.message }>
                    { post.message }
                </div>
                {
                    extraFooter
                    ? <footer>
                        { extraFooter }
                    </footer>
                    : null
                }
                { module }
            </div>
        </article>
    );
});